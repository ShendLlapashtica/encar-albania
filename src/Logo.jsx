export function LogoInline() {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <svg
        className="logo-car-svg"
        viewBox="0 0 90 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6 18 C6 18 8 10 14 9 L26 7.5 C28.5 7.5 30.5 6 34 6 L56 6 C59 6 61.5 7 63.5 9 L72 10.5 C76 11.5 80 14 82 18 L84 18 L84 20 C84 21.1 83.1 22 82 22 L76 22 C76 19.5 73.8 17.5 71 17.5 C68.2 17.5 66 19.5 66 22 L24 22 C24 19.5 21.8 17.5 19 17.5 C16.2 17.5 14 19.5 14 22 L8 22 C6.9 22 6 21.1 6 20 Z"
          fill="currentColor"
          opacity="0.9"
        />
        <circle cx="19" cy="22" r="3.2" fill="currentColor" />
        <circle cx="71" cy="22" r="3.2" fill="currentColor" />
        <rect x="34" y="7" width="14" height="8" rx="1.5" fill="rgba(0,0,0,0.3)" />
        <rect x="50" y="7.5" width="11" height="7.5" rx="1.5" fill="rgba(0,0,0,0.3)" />
        <rect x="20" y="8.5" width="12" height="7" rx="1.5" fill="rgba(0,0,0,0.3)" />
      </svg>
      <span className="logo-words">
        <span className="logo-auto">AUTO</span>
        <span className="logo-blendi">BLENDI</span>
      </span>
    </span>
  );
}

export function LogoBadge({ size = 120 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="logo-badge-svg"
      aria-label="Auto Korea Blendi"
    >
      <circle cx="60" cy="60" r="58" stroke="#e8763a" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="50" stroke="rgba(232,118,58,0.2)" strokeWidth="1" />

      {/* Car silhouette */}
      <g transform="translate(17,46)">
        <path
          d="M4 18 C4 18 6 11 12 10 L22 8.5 C24 8.5 25.5 7 28 7 L50 7 C52.5 7 54.5 8 56 10 L63 11.5 C66.5 12.5 69 14.5 70 18 L72 18 L72 19.8 C72 20.7 71.3 21.5 70.3 21.5 L65 21.5 C65 19.2 63 17.4 60.5 17.4 C58 17.4 56 19.2 56 21.5 L20 21.5 C20 19.2 18 17.4 15.5 17.4 C13 17.4 11 19.2 11 21.5 L5.7 21.5 C4.8 21.5 4 20.7 4 19.8 Z"
          fill="#e8763a"
        />
        <circle cx="15.5" cy="21.5" r="3" fill="#c74e28" />
        <circle cx="60.5" cy="21.5" r="3" fill="#c74e28" />
        <rect x="28" y="8" width="12" height="7" rx="1.2" fill="rgba(0,0,0,0.35)" />
        <rect x="42" y="8.5" width="10" height="6.5" rx="1.2" fill="rgba(0,0,0,0.35)" />
        <rect x="16" y="9.5" width="10" height="6" rx="1.2" fill="rgba(0,0,0,0.35)" />
      </g>

      {/* AUTO text (small top) */}
      <text
        x="60" y="30"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800"
        fontSize="9"
        letterSpacing="5"
        fill="#8888a0"
        textLength="42"
        lengthAdjust="spacing"
      >AUTO</text>

      {/* BLENDI text (big bottom) */}
      <text
        x="60" y="98"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="900"
        fontSize="20"
        letterSpacing="3"
        fill="#f0f0f5"
      >BLENDI</text>

      {/* decorative dots */}
      <circle cx="22" cy="98" r="2" fill="#e8763a" opacity="0.7" />
      <circle cx="98" cy="98" r="2" fill="#e8763a" opacity="0.7" />
    </svg>
  );
}
