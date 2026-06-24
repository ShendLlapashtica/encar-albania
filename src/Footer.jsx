import { LogoBadge } from './Logo';

export default function Footer() {
  return (
    <footer>
      <div className="foot-logo">
        <LogoBadge size={72} />
      </div>
      <p style={{ marginBottom: 8, fontWeight: 700, fontSize: 14, color: '#8888a0' }}>Auto Korea Blendi</p>
      <p style={{ marginBottom: 6 }}>
        📍 <a href="https://maps.google.com/?q=Gadime,+Kosovë" target="_blank" rel="noopener noreferrer">Magjistrale Prishtinë–Ferizaj (Gadime)</a>
      </p>
      <p style={{ marginBottom: 6 }}>
        <a href="tel:044555630">📞 044 555 630</a>
      </p>
      <p style={{ marginTop: 16, opacity: .5 }}>© {new Date().getFullYear()} Auto Korea Blendi. Të gjitha të drejtat e rezervuara.</p>
    </footer>
  );
}
