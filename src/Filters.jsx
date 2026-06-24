import { useState, useEffect } from 'react';
import { BRANDS, MODEL_MAP } from './data';

const YEARS  = Array.from({ length: 20 }, (_, i) => 2024 - i);
const FUELS  = ['가솔린', '디젤', '하이브리드', '전기', 'LPG'];
const FUEL_LBL = { '가솔린': 'Benzin', '디젤': 'Dizel', '하이브리드': 'Hibrid', '전기': 'Elektrik', 'LPG': 'LPG' };

const MILAGES = [
  { label: 'Nën 30,000 km', value: 30000 },
  { label: 'Nën 50,000 km', value: 50000 },
  { label: 'Nën 100,000 km', value: 100000 },
  { label: 'Nën 150,000 km', value: 150000 },
  { label: 'Nën 200,000 km', value: 200000 },
];

export default function Filters({ initial = {}, onApply }) {
  const [brand, setBrand]       = useState(initial.manufacturer || '');
  const [model, setModel]       = useState('');
  const [fuel, setFuel]         = useState(initial.fuel || '');
  const [yearFrom, setYearFrom] = useState(initial.yearFrom || '');
  const [yearTo, setYearTo]     = useState(initial.yearTo || '');
  const [milTo, setMilTo]       = useState('');

  useEffect(() => {
    setBrand(initial.manufacturer || '');
    setFuel(initial.fuel || '');
    setYearFrom(initial.yearFrom || '');
    setYearTo(initial.yearTo || '');
  }, [initial.manufacturer, initial.fuel, initial.yearFrom, initial.yearTo]);

  const models = brand && MODEL_MAP[brand] ? MODEL_MAP[brand] : [];

  const apply = () => {
    const f = {};
    if (brand)    f.manufacturer = brand;
    if (model)    f.model = model;
    if (fuel)     f.fuel = fuel;
    if (yearFrom) f.yearFrom = yearFrom;
    if (yearTo)   f.yearTo = yearTo;
    if (milTo)    f.mileageTo = milTo;
    onApply(f);
  };

  const clear = () => {
    setBrand(''); setModel(''); setFuel('');
    setYearFrom(''); setYearTo(''); setMilTo('');
    onApply({});
  };

  return (
    <div className="filt">
      <div className="filt-in">
        <div className="filt-grid">
          <div className="fl">
            <label>Marka</label>
            <select value={brand} onChange={e => { setBrand(e.target.value); setModel(''); }}>
              <option value="">Të gjitha markat</option>
              {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div className="fl">
            <label>Modeli</label>
            <select value={model} onChange={e => setModel(e.target.value)} disabled={!models.length}>
              <option value="">Të gjitha modelet</option>
              {models.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="fl">
            <label>Karburant</label>
            <select value={fuel} onChange={e => setFuel(e.target.value)}>
              <option value="">I gjithë karburanti</option>
              {FUELS.map(f => <option key={f} value={f}>{FUEL_LBL[f]}</option>)}
            </select>
          </div>

          <div className="fl">
            <label>Vit (nga)</label>
            <select value={yearFrom} onChange={e => setYearFrom(e.target.value)}>
              <option value="">Nga viti</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="fl">
            <label>Vit (deri)</label>
            <select value={yearTo} onChange={e => setYearTo(e.target.value)}>
              <option value="">Deri viti</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="fl">
            <label>Kilometrat</label>
            <select value={milTo} onChange={e => setMilTo(e.target.value)}>
              <option value="">Të gjitha</option>
              {MILAGES.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </div>

          <div className="fl" style={{ justifyContent: 'flex-end', flexDirection: 'row', gap: 8, alignItems: 'flex-end' }}>
            <button className="btn-clr" onClick={clear}>Pastro</button>
            <button className="btn-go" onClick={apply}>Kërko</button>
          </div>
        </div>
      </div>
    </div>
  );
}
