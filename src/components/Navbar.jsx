export default function Navbar() {
  return (
    <header className="site-header" aria-label="Cabecera del sitio">
      <nav className="navbar" aria-label="Navegación principal">
        <div className="nav-container">
          <div className="nav-brand">
            <a href="/" className="logo-text" aria-label="AMY - inicio">AMY</a>
            <span className="logo-badge">VALORANT PLAYER</span>
          </div>
          <div className="nav-menu">
            <a href="#agents" className="nav-link glitch-hover">🎯 Especialidades</a>
            <a href="#gear" className="nav-link glitch-hover">⚙️ Setup</a>
            <a href="#shorts" className="nav-link glitch-hover">🎬 Amy Show</a>
          </div>
          <div className="nav-controls">
            <a href="https://www.tiktok.com/@amyjgil" target="_blank" rel="noopener noreferrer" className="social-link social-icon-link" aria-label="TikTok de AMY (se abre en una nueva pestaña)">
              <img src="assets/imagenes/tiktok_art.svg" alt="TikTok" className="social-icon" width="24" height="24" />
            </a>
            <a href="https://www.youtube.com/@AmyJGil" target="_blank" rel="noopener noreferrer" className="social-link social-icon-link" aria-label="YouTube de AMY (se abre en una nueva pestaña)">
              <img src="assets/imagenes/youtube_art.svg" alt="YouTube" className="social-icon" width="24" height="24" />
            </a>
            <button className="mode-toggle" id="audioBtn" aria-label="Activar/desactivar audio">🔇</button>
            <button className="mode-toggle" id="modeBtn" aria-label="Cambiar modo competitivo">🖤</button>
          </div>
        </div>
      </nav>
    </header>
  );
}
