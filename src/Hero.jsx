import { useState } from 'react';
import { HERO_BRANDS } from './data';

export default function Hero({ total, loading, onSearch, onBrand }) {
  const [q, setQ] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onSearch(q.trim());
  };

  return (
    <section className="hero">
      <div className="hero-in">
        <div className="hero-glass">
          <p className="hero-lbl">
            <span className="live-dot" />
            Makina direkt nga Korea
          </p>

          <h1 className="hero-title">
            Gjeni makinën tuaj<br />
            <em>nga Korea</em>
          </h1>

          <p className="hero-sub">
            Makina cilësore të importuara drejtpërdrejt nga Koreja e Jugut.
            Transport &amp; doganim i plotë deri te dera juaj.
          </p>

          <form className="hero-search" onSubmit={submit}>
            <input
              type="text"
              placeholder="Kërko markë, model, vit..."
              value={q}
              onChange={e => setQ(e.target.value)}
              aria-label="Kërko makina"
            />
            <button type="submit">🔍 Kërko</button>
          </form>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num" style={{ background: 'linear-gradient(135deg,#e8763a,#f0a060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {loading ? '...' : total > 0 ? `${total.toLocaleString()}+` : '5,000+'}
              </span>
              <span className="stat-lbl">Makina aktive</span>
            </div>
            <div className="stat">
              <span className="stat-num" style={{ background: 'linear-gradient(135deg,#e8763a,#f0a060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>26</span>
              <span className="stat-lbl">Marka</span>
            </div>
            <div className="stat">
              <span className="stat-num" style={{ background: 'linear-gradient(135deg,#e8763a,#f0a060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>100%</span>
              <span className="stat-lbl">Garantuar</span>
            </div>
          </div>

          <div className="chips">
            {HERO_BRANDS.map(b => (
              <button key={b} className="chip" onClick={() => onBrand(b)}>{b}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
