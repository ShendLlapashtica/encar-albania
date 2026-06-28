import { useState, useMemo } from 'react';
import CarCard from './CarCard';
import CarModal from './CarModal';
import { tr, eur } from './utils';
import { BRAND_ALIASES } from './data';

const PAGE = 32;

function Skeletons({ n = 12 }) {
  return Array.from({ length: n }, (_, i) => (
    <div className="skel-card" key={i}>
      <div className="skel-img" />
      <div className="skel-body">
        <div className="skel-ln w80" />
        <div className="skel-ln w60" />
        <div className="skel-ln w40" />
      </div>
    </div>
  ));
}

function match(car, q) {
  if (!q) return true;
  const lq = q.toLowerCase().trim();

  // Year: match first 4 chars of FormYear
  const yearStr = String(car.FormYear || '').slice(0, 4);
  if (yearStr && yearStr.includes(lq)) return true;

  // Translated fields (model, badge, etc.)
  const fields = [car.Manufacturer, car.Maker, car.Model, car.Badge, car.BadgeSub];
  if (fields.some(f => f && tr(f).toLowerCase().includes(lq))) return true;

  // Raw fields in case translation strips too much
  if (fields.some(f => f && String(f).toLowerCase().includes(lq))) return true;

  // Brand alias matching: e.g. "bmw" → BMW cars
  for (const [brand, aliases] of Object.entries(BRAND_ALIASES)) {
    const brandLower = brand.toLowerCase();
    if (brandLower.includes(lq) || aliases.some(a => a.toLowerCase().includes(lq))) {
      const mfr = (car.Manufacturer || car.Maker || '').toLowerCase();
      if (mfr.includes(brandLower) || mfr.includes(lq)) return true;
    }
  }

  return false;
}

export default function CarGrid({ cars, loading, error, total, search, onRetry }) {
  const [selected, setSelected] = useState(null);
  const [sort, setSort]         = useState('default');
  const [page, setPage]         = useState(1);

  const filtered = useMemo(() => {
    let list = cars;
    if (search) list = list.filter(c => match(c, search));
    if (sort === 'price-asc')  list = [...list].sort((a,b) => (a.Price||0) - (b.Price||0));
    if (sort === 'price-desc') list = [...list].sort((a,b) => (b.Price||0) - (a.Price||0));
    if (sort === 'year-desc')  list = [...list].sort((a,b) => (b.FormYear||0) - (a.FormYear||0));
    if (sort === 'km-asc')     list = [...list].sort((a,b) => (a.Mileage||0) - (b.Mileage||0));
    return list;
  }, [cars, search, sort]);

  const visible = filtered.slice(0, page * PAGE);
  const hasMore = visible.length < filtered.length;

  if (loading && cars.length === 0) {
    return (
      <div className="content">
        <div className="skel-grid"><Skeletons n={12} /></div>
      </div>
    );
  }

  if (error && cars.length === 0) {
    return (
      <div className="content">
        <div className="car-grid">
          <div className="empty">
            <div className="empty-icon">⚠️</div>
            <h3>Nuk u lidh me serverin</h3>
            <p>{error}</p>
            <button onClick={onRetry}>Provo përsëri</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="results-bar">
        <p className="res-count">
          {filtered.length > 0
            ? <><strong>{filtered.length.toLocaleString()}</strong> makina{search ? ` për "${search}"` : ''}{loading ? ' (duke ngarkuar…)' : ''}</>
            : loading ? 'Duke kërkuar…' : 'Asnjë makinë'}
        </p>
        <select className="sort-sel" value={sort} onChange={e => { setSort(e.target.value); setPage(1); }} aria-label="Rendit">
          <option value="default">Renditja parazgjedhur</option>
          <option value="price-asc">Çmimi (i ulët – i lartë)</option>
          <option value="price-desc">Çmimi (i lartë – i ulët)</option>
          <option value="year-desc">Viti (më i ri)</option>
          <option value="km-asc">Kilometra (më pak)</option>
        </select>
      </div>

      {filtered.length === 0 && !loading ? (
        <div className="car-grid">
          <div className="empty">
            <div className="empty-icon">🔍</div>
            <h3>Asnjë makinë e gjetur</h3>
            <p>Provo të ndryshosh filtrat ose kërkimin tënd.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="car-grid">
            {visible.map(car => (
              <CarCard key={car.Id ?? car.CarId ?? Math.random()} car={car} onClick={() => setSelected(car)} />
            ))}
            {loading && cars.length > 0 && <Skeletons n={6} />}
          </div>

          {hasMore && (
            <div className="load-more-wrap">
              <button className="load-more" onClick={() => setPage(p => p + 1)}>
                Shfaq më shumë ({filtered.length - visible.length} mbetur)
              </button>
            </div>
          )}
        </>
      )}

      {selected && <CarModal car={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
