import { tr, eur, fmtEur, fmtKm, fmtYear, imgUrl, FUEL } from './utils';

export default function CarCard({ car, onClick }) {
  const manufacturer = tr(car.Manufacturer || car.Maker || '');
  const model        = tr(car.Model || '');
  const badge        = tr(car.Badge || car.BadgeSub || '');
  const title        = [manufacturer, model, badge].filter(Boolean).join(' ');
  const sub          = tr(car.FormYear || car.CylinderCapacity ? `${fmtYear(car.FormYear)} · ${car.CylinderCapacity ? car.CylinderCapacity + 'cc' : ''}` : '');
  const price        = eur(car.Price || 0);
  const km           = car.Mileage ? fmtKm(car.Mileage) : null;
  const fuel         = FUEL[car.FuelType] || tr(car.FuelType) || '';
  const year         = fmtYear(car.FormYear);
  const photo        = imgUrl(car.Photos?.[0]?.RealName || car.Photo);
  const isNew        = car.Year >= 2023;

  return (
    <article className="card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      aria-label={`${title}, ${fmtEur(price)}`}
    >
      <div className="card-thumb">
        {photo
          ? <img src={photo} alt={title} loading="lazy" onError={e => { e.target.style.display = 'none'; e.target.parentElement.querySelector('.card-no-img').style.display = 'flex'; }} />
          : null}
        <div className="card-no-img" style={{ display: photo ? 'none' : 'flex' }}>🚗</div>
        {isNew && <span className="card-new">Ri</span>}
      </div>

      <div className="card-info">
        <div className="card-name" title={title}>{title || 'Makinë'}</div>
        <div className="card-sub">{year}{year && fuel ? ' · ' : ''}{fuel}</div>
        <div className="card-price">{price > 0 ? fmtEur(price) : '—'}</div>
        <div className="card-tags">
          {km && <span className="tag">📍 {km}</span>}
          {car.Transmission && <span className="tag">{car.Transmission === 'A' || car.Transmission === '오토' ? 'Automatik' : 'Manual'}</span>}
          {car.CylinderCapacity && <span className="tag">{car.CylinderCapacity}cc</span>}
        </div>
      </div>
    </article>
  );
}
