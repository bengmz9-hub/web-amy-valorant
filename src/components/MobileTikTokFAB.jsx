export default function MobileTikTokFAB() {
  return (
    <aside aria-label="TikTok oficial de Amy">
      <a
        href="https://www.tiktok.com/@amyjgil"
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-tiktok-fab"
        aria-label="Ver TikTok oficial de Amy @amyjgil (se abre en nueva pestaña)"
      >
        <span className="fab-glow-ring" aria-hidden="true" />
        <div className="fab-icon-wrapper" aria-hidden="true">
          <svg className="fab-tiktok-svg" viewBox="0 0 24 24" fill="none">
            {/* Capa Cyan */}
            <path
              d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.04-.051a2.89 2.89 0 0 1 2.345-4.584c.31 0 .61.05.89.141V9.43a6.335 6.335 0 0 0-.89-.063 6.336 6.336 0 0 0-6.335 6.334 6.336 6.336 0 0 0 6.335 6.335 6.336 6.336 0 0 0 6.336-6.335V8.868a8.18 8.18 0 0 0 4.77 1.523V6.945a4.832 4.832 0 0 1-.995-.259z"
              fill="#25F4EE"
              className="tiktok-cyan-shift"
            />
            {/* Capa Magenta */}
            <path
              d="M19.389 6.486a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.04-.051a2.89 2.89 0 0 1 2.345-4.584c.31 0 .61.05.89.141V9.43a6.335 6.335 0 0 0-.89-.063 6.336 6.336 0 0 0-6.335 6.334 6.336 6.336 0 0 0 6.335 6.335 6.336 6.336 0 0 0 6.336-6.335V8.868a8.18 8.18 0 0 0 4.77 1.523V6.945a4.832 4.832 0 0 1-.995-.259z"
              fill="#FE2C55"
              className="tiktok-red-shift"
            />
            {/* Capa Blanca Principal */}
            <path
              d="M19.489 6.586a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.04-.051a2.89 2.89 0 0 1 2.345-4.584c.31 0 .61.05.89.141V9.43a6.335 6.335 0 0 0-.89-.063 6.336 6.336 0 0 0-6.335 6.334 6.336 6.336 0 0 0 6.335 6.335 6.336 6.336 0 0 0 6.336-6.335V8.868a8.18 8.18 0 0 0 4.77 1.523V6.945a4.832 4.832 0 0 1-.995-.259z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
        <div className="fab-text">
          <span className="fab-tag">TIKTOK</span>
          <span className="fab-handle">@amyjgil</span>
        </div>
        <span className="fab-live-dot" aria-hidden="true" />
      </a>
    </aside>
  );
}
