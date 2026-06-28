import { useState, useCallback, useRef } from 'react';
import { dedup } from './utils.js';
import { API_COUNT } from './data.js';

async function loadPage(base, page) {
  const p = new URLSearchParams({ ...base, page, count: API_COUNT });
  const r = await fetch(`/api/cars?${p}`);
  const data = await r.json();
  if (!r.ok || !Array.isArray(data.SearchResults))
    throw new Error(data.error || `HTTP ${r.status}`);
  return data;
}

export function useCars() {
  const [cars, setCars]       = useState([]);
  const [total, setTotal]     = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const session               = useRef(0);

  const fetchCars = useCallback(async (filters = {}) => {
    const sid = ++session.current;
    setLoading(true);
    setError(null);
    setCars([]);

    const base = {};
    if (filters.manufacturer) base.manufacturer = filters.manufacturer;
    if (filters.model)        base.model        = filters.model;
    if (filters.fuel)         base.fuel         = filters.fuel;
    if (filters.yearFrom)     base.yearFrom     = filters.yearFrom;
    if (filters.yearTo)       base.yearTo       = filters.yearTo;
    if (filters.mileageTo)    base.mileageTo    = filters.mileageTo;

    try {
      const first = await loadPage(base, 0);
      if (sid !== session.current) return;

      let acc = dedup(first.SearchResults || []);
      setTotal(first.Count || 0);
      setCars([...acc]);
      setLoading(false);

      const cap      = Math.min(first.Count || 0, 5000);
      const numPages = Math.min(Math.ceil(cap / API_COUNT), 10);

      for (let pg = 1; pg < numPages; pg += 3) {
        if (sid !== session.current) return;
        const batch   = [pg, pg + 1, pg + 2].filter(p => p < numPages);
        const results = await Promise.allSettled(batch.map(p => loadPage(base, p)));
        if (sid !== session.current) return;
        results.forEach(r => {
          if (r.status === 'fulfilled')
            acc = dedup([...acc, ...r.value.SearchResults]);
        });
        setCars([...acc]);
      }
    } catch (e) {
      if (sid !== session.current) return;
      setError(e.message || 'Gabim i papritur');
      setLoading(false);
    }
  }, []);

  return { cars, total, loading, error, fetchCars };
}
