import { useEffect } from 'react';
import { tr, eur, fmtEur, fmtKm, fmtYear, imgUrl, FUEL, TRANS, COLOR } from './utils';

export default function CarModal({ car, onClose }) {
  useEffect(() => {
    const esc = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [onClose]);

  const manufacturer = tr(car.Manufacturer || car.Maker || '');
  const model        = tr(car.Model || '');
  const badge        = tr(car.Badge || car.BadgeSub || '');
  const title        = [manufacturer, model, badge].filter(Boolean).join(' ');
  const price        = eur(car.Price || 0);
  const photo        = imgUrl(car.Photos?.[0]?.RealName || car.Photo);
  const year         = fmtYear(car.FormYear);
  const fuel         = FUEL[car.FuelType] || tr(car.FuelType) || '—';
  const trans        = TRANS[car.Transmission] || tr(car.Transmission) || '—';
  const color        = COLOR[car.Color] || tr(car.Color) || '—';
  const km           = car.Mileage ? fmtKm(car.Mileage) : '—';
  const cc           = car.CylinderCapacity ? `${car.CylinderCapacity} cc` : '—';
  const accNum       = car.Accident ?? null;
  const owners       = car.Owners ?? null;
  const krwRaw       = car.Price ? (car.Price * 10000).toLocaleString('ko-KR') + ' ₩' : null;

  const phone = '044555630';
  const waMsg = encodeURIComponent(`Mirëdita! Jam i interesuar për makinën: ${title} (${year}) — ${fmtEur(price)}`);

  return (
    <div className="modal-ov" onClick={e => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal">
        <div className="modal-img-wrap">
          {photo
            ? <img className="modal-img" src={photo} alt={title} />
            : <div className="modal-img-ph">🚗</div>}
          <button className="modal-x" onClick={onClose} aria-label="Mbyll">✕</button>
        </div>

        <div className="modal-scroll">
          <div className="modal-body">
            <h2 className="modal-title">{title || 'Makinë'}</h2>
            <p className="modal-yr">{year}{year && fuel !== '—' ? ` · ${fuel}` : ''}</p>
            <p className="modal-price">{price > 0 ? fmtEur(price) : '—'}</p>
            {krwRaw && <p className="modal-krw">≈ {krwRaw} (çmimi Korea)</p>}

            <p className="sec-lbl">Specifikimet</p>
            <div className="spec-g3">
              <div className="spec"><p className="spec-l">Viti</p><p className="spec-v">{year || '—'}</p></div>
              <div className="spec"><p className="spec-l">Km</p><p className="spec-v">{km}</p></div>
              <div className="spec"><p className="spec-l">Karburant</p><p className="spec-v">{fuel}</p></div>
              <div className="spec"><p className="spec-l">Transmisioni</p><p className="spec-v">{trans}</p></div>
              <div className="spec"><p className="spec-l">Motorri</p><p className="spec-v">{cc}</p></div>
              <div className="spec"><p className="spec-l">Ngjyra</p><p className="spec-v">{color}</p></div>
            </div>

            {(accNum !== null || owners !== null) && <>
              <p className="sec-lbl">Historia</p>
              <div className="spec-g2">
                {accNum !== null && (
                  <div className="hist">
                    <span className="hist-ico">{accNum === 0 ? '✅' : '⚠️'}</span>
                    <div>
                      <p className="hist-l">Aksidente</p>
                      <p className={`hist-v ${accNum === 0 ? 'good' : 'warn'}`}>{accNum === 0 ? 'Asnjë aksident' : `${accNum} aksident(e)`}</p>
                    </div>
                  </div>
                )}
                {owners !== null && (
                  <div className="hist">
                    <span className="hist-ico">👤</span>
                    <div>
                      <p className="hist-l">Pronarë</p>
                      <p className="hist-v">{owners} pronar(ë)</p>
                    </div>
                  </div>
                )}
              </div>
            </>}

            <p className="sec-lbl">Kontakto Auto Korea Blendi</p>
            <div className="modal-acts">
              <a className="btn-prim" href={`tel:${phone}`}>📞 044 555 630</a>
              <a className="btn-sec" href={`https://wa.me/383${phone.slice(1)}?text=${waMsg}`} target="_blank" rel="noopener noreferrer">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
