import { useState } from 'react';
import { LogoInline } from './Logo';

export default function Header({ page, onNavigate }) {
  const [open, setOpen] = useState(false);

  const go = (p) => { onNavigate(p); setOpen(false); };

  return (
    <>
      <header className="hdr">
        <div className="hdr-in">
          <button className="logo-btn" onClick={() => go('home')} aria-label="Auto Korea Blendi — Kryefaqja">
            <LogoInline />
          </button>

          {/* Desktop nav */}
          <nav className="nav">
            <button className={`nav-lnk${page === 'home' ? ' active' : ''}`} onClick={() => go('home')}>Makina</button>
            <button className={`nav-lnk${page === 'customs' ? ' active' : ''}`} onClick={() => go('customs')}>Kalkulator Dogane</button>
            <a className="nav-lnk" href="https://maps.google.com/?q=Gadime,+Kosovë" target="_blank" rel="noopener noreferrer">Vendndodhja</a>
            <a className="nav-cta" href="tel:044555630">📞 044 555 630</a>
          </nav>

          {/* Mobile hamburger */}
          <button className="nav-ham" onClick={() => setOpen(true)} aria-label="Hap menunë">
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Business strip */}
      <div className="biz">
        <div className="biz-in">
          <span className="biz-it">
            <span>📍</span>
            <a href="https://maps.google.com/?q=Gadime,+Kosovë" target="_blank" rel="noopener noreferrer">
              Magjistrale Prishtinë–Ferizaj (Gadime)
            </a>
          </span>
          <span className="biz-sep" />
          <span className="biz-it">🛃 Doganim &amp; inspektim</span>
          <span className="biz-sep" />
          <span className="biz-it">🚚 Transport deri në Kosovë</span>
          <span className="biz-sep" />
          <span className="biz-it">💳 Pagesa në Kosovë</span>
          <span className="biz-sep" />
          <span className="biz-it"><a href="tel:044555630">📞 044 555 630</a></span>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div className={`nav-mob${open ? ' open' : ''}`} role="dialog" aria-modal="true">
        <button className="nav-mob-close" onClick={() => setOpen(false)} aria-label="Mbyll menunë">✕</button>
        <button className={`nav-lnk${page === 'home' ? ' active' : ''}`} onClick={() => go('home')} style={{ fontSize: 22, padding: '14px 28px' }}>Makina</button>
        <button className={`nav-lnk${page === 'customs' ? ' active' : ''}`} onClick={() => go('customs')} style={{ fontSize: 22, padding: '14px 28px' }}>Kalkulator Dogane</button>
        <a className="nav-lnk" href="https://maps.google.com/?q=Gadime,+Kosovë" target="_blank" rel="noopener noreferrer" style={{ fontSize: 22, padding: '14px 28px' }}>Vendndodhja</a>
        <a className="nav-cta" href="tel:044555630" style={{ fontSize: 18, padding: '14px 28px', borderRadius: 12 }}>📞 044 555 630</a>
      </div>
    </>
  );
}
