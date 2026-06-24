import { useState } from 'react';
import { LogoBadge } from './Logo';

const EXCISE_RATES = [
  { label: '0 – 1.000 cc',  ccMin: 0,    ccMax: 1000,  ratePerCC: 0.5  },
  { label: '1.001 – 1.300 cc', ccMin: 1001, ccMax: 1300, ratePerCC: 1.0  },
  { label: '1.301 – 1.600 cc', ccMin: 1301, ccMax: 1600, ratePerCC: 1.5  },
  { label: '1.601 – 2.000 cc', ccMin: 1601, ccMax: 2000, ratePerCC: 2.0  },
  { label: '2.001 – 2.500 cc', ccMin: 2001, ccMax: 2500, ratePerCC: 3.0  },
  { label: '2.501 – 3.000 cc', ccMin: 2501, ccMax: 3000, ratePerCC: 4.0  },
  { label: '3.001+ cc',        ccMin: 3001, ccMax: Infinity, ratePerCC: 5.0 },
];

const AGE_MULTS = [
  { label: '0–3 vjet',   minAge: 0, maxAge: 3,  mult: 1.0  },
  { label: '4–6 vjet',   minAge: 4, maxAge: 6,  mult: 0.85 },
  { label: '7–9 vjet',   minAge: 7, maxAge: 9,  mult: 0.7  },
  { label: '10–12 vjet', minAge: 10, maxAge: 12, mult: 0.55 },
  { label: '13+ vjet',   minAge: 13, maxAge: Infinity, mult: 0.4 },
];

const SVCS = [
  { ico: '🛃', name: 'Doganim & inspektim', sub: 'Procedurat e plotë doganore dhe inspektimi teknik i makinës' },
  { ico: '🚢', name: 'Transport deri në Kosovë', sub: 'Transport i sigurt nga Koreja deri te dera juaj' },
  { ico: '💳', name: 'Pagesa në Kosovë', sub: 'Mundësi pagese të plota brenda Kosovës' },
];

function fmt(n) { return '€' + Math.round(n).toLocaleString('de-DE'); }

export default function Customs() {
  const [price, setPrice]   = useState('');
  const [cc, setCc]         = useState('');
  const [year, setYear]     = useState('');
  const [result, setResult] = useState(null);

  const calc = () => {
    const p  = parseFloat(price);
    const c  = parseInt(cc);
    const y  = parseInt(year);
    if (isNaN(p) || isNaN(c) || isNaN(y)) return;

    const age = new Date().getFullYear() - y;

    const duty = p * 0.10;
    const base = p + duty;
    const vat  = base * 0.18;

    const exciseBand = EXCISE_RATES.find(b => c >= b.ccMin && c <= b.ccMax) || EXCISE_RATES.at(-1);
    const ageMult    = AGE_MULTS.find(a => age >= a.minAge && age <= a.maxAge) || AGE_MULTS.at(-1);
    const excise     = c * exciseBand.ratePerCC * ageMult.mult;

    const total = duty + vat + excise;

    setResult({ duty, vat, excise, total, ageLabel: ageMult.label, ccLabel: exciseBand.label });
  };

  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

  return (
    <>
      <div className="page-hero">
        <p className="page-lbl">Auto Korea Blendi</p>
        <h1 className="page-title">Kalkulator <em>Dogane</em></h1>
        <p className="page-sub">Llogarit tarifat e doganimit për makinën tuaj nga Koreja</p>
      </div>

      <div className="calc-wrap">
        <div className="calc-cols">
          <div className="calc-card">
            <p className="card-hd">Të dhënat e makinës</p>

            <div className="field">
              <label>Çmimi i makinës (€)</label>
              <input
                type="number" min="0" placeholder="p.sh. 15000"
                value={price} onChange={e => setPrice(e.target.value)}
              />
              <small>Çmimi i blerjes në Korea (pa transport)</small>
            </div>

            <div className="field">
              <label>Motorri (cc)</label>
              <input
                type="number" min="500" max="8000" placeholder="p.sh. 2000"
                value={cc} onChange={e => setCc(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Viti i prodhimit</label>
              <select value={year} onChange={e => setYear(e.target.value)}>
                <option value="">Zgjidh vitin</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <button className="btn-calc" onClick={calc}>Llogarit Doganen</button>
          </div>

          <div className="res-card">
            <p className="card-hd">Rezultati</p>
            {!result ? (
              <div className="ph-box">
                <div className="pi">🧮</div>
                <p>Plotëso të dhënat dhe kliko "Llogarit"</p>
              </div>
            ) : (
              <>
                <div className="res-row">
                  <span className="res-lbl">Çmimi i makinës</span>
                  <span className="res-val">{fmt(parseFloat(price))}</span>
                </div>
                <div className="res-row">
                  <span className="res-lbl">
                    Dogana (10%)
                  </span>
                  <span className="res-val">{fmt(result.duty)}</span>
                </div>
                <div className="res-row">
                  <span className="res-lbl">
                    TVSH (18%)
                    <small>Bazë: çmimi + dogana</small>
                  </span>
                  <span className="res-val">{fmt(result.vat)}</span>
                </div>
                <div className="res-row">
                  <span className="res-lbl">
                    Akciza
                    <small>{result.ccLabel} · {result.ageLabel}</small>
                  </span>
                  <span className="res-val">{fmt(result.excise)}</span>
                </div>

                <div className="res-total">
                  <span className="res-total-lbl">Totali i doganimit</span>
                  <span className="res-total-val">{fmt(result.total)}</span>
                </div>

                <p className="discl">
                  ⚠️ Llogaritja është orientuese. Tarifat aktuale mund të ndryshojnë sipas rregullores doganore të Kosovës.
                  Kontaktoni Auto Korea Blendi për konfirmim.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="svc-grid">
        {SVCS.map(s => (
          <div className="svc" key={s.name}>
            <div className="svc-ico">{s.ico}</div>
            <div className="svc-name">{s.name}</div>
            <div className="svc-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="cta-bar">
        <div className="cta-inner">
          <div className="cta-txt">
            <strong>Keni nevojë për ndihmë?</strong>
            Kontaktoni direkt Auto Korea Blendi
          </div>
          <a className="btn-cta" href="tel:044555630">📞 044 555 630</a>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '3rem' }}>
        <LogoBadge size={100} />
      </div>
    </>
  );
}
