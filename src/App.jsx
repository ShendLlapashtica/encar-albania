import { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Hero from './Hero';
import Filters from './Filters';
import CarGrid from './CarGrid';
import Customs from './Customs';
import Footer from './Footer';
import { useCars } from './useCars';

export default function App() {
  const [page, setPage]           = useState('home');
  const [filters, setFilters]     = useState({});
  const [search, setSearch]       = useState('');

  const { cars, total, loading, error, fetchCars } = useCars();

  useEffect(() => {
    fetchCars({});
  }, [fetchCars]);

  const applyFilters = useCallback((f) => {
    setFilters(f);
    setSearch('');
    fetchCars(f);
  }, [fetchCars]);

  const applySearch = useCallback((q) => {
    setSearch(q);
  }, []);

  const applyBrand = useCallback((brand) => {
    const f = { manufacturer: brand };
    setFilters(f);
    setSearch('');
    fetchCars(f);
  }, [fetchCars]);

  const retry = useCallback(() => fetchCars(filters), [fetchCars, filters]);

  return (
    <>
      <Header page={page} onNavigate={setPage} />

      {page === 'home' ? (
        <>
          <Hero total={total} loading={loading} onSearch={applySearch} onBrand={applyBrand} />
          <Filters initial={filters} onApply={applyFilters} />
          <CarGrid
            cars={cars}
            loading={loading}
            error={error}
            total={total}
            search={search}
            onRetry={retry}
          />
        </>
      ) : (
        <Customs />
      )}

      <Footer />
    </>
  );
}
