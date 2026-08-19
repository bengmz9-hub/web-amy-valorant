import React, { useState } from 'react';

export default function Footer() {
  const [activeTab, setActiveTab] = useState('A');

  const scrollToTop = () => {
    const rootEl = document.getElementById('root') || document.documentElement;
    rootEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="footer-wrapper-preview">
      {/* Switcher de Vista Previa en Vivo */}
      <div className="footer-preview-switcher" role="toolbar" aria-label="Selector de diseño de footer">
        <span className="switcher-label">⚡ VISTA PREVIA FOOTER:</span>
        <div className="switcher-tabs">
          <button
            type="button"
            className={`switcher-btn ${activeTab === 'A' ? 'active' : ''}`}
            onClick={() => setActiveTab('A')}
          >
            Opción A · Tactical HUD
          </button>
          <button
            type="button"
            className={`switcher-btn ${activeTab === 'B' ? 'active' : ''}`}
            onClick={() => setActiveTab('B')}
          >
            Opción B · Bento Glass
          </button>
          <button
            type="button"
            className={`switcher-btn ${activeTab === 'C' ? 'active' : ''}`}
            onClick={() => setActiveTab('C')}
          >
            Opción C · Cinematic Monolith
          </button>
        </div>
      </div>

      {/* Renderizado de la opción seleccionada */}
      {activeTab === 'A' && <FooterTacticalHUD onScrollTop={scrollToTop} />}
      {activeTab === 'B' && <FooterBentoGlass onScrollTop={scrollToTop} />}
      {activeTab === 'C' && <FooterCinematicMonolith onScrollTop={scrollToTop} />}
    </div>
  );
}

/* =========================================================================
   OPCIÓN A: Tactical HUD Command Terminal
   ========================================================================= */
function FooterTacticalHUD({ onScrollTop }) {
  return (
    <footer className="footer-hud" role="contentinfo" aria-label="Pie de página táctico">
      {/* Barra de telemetría superior */}
      <div className="hud-top-bar">
        <div className="hud-status">
          <span className="hud-led-platino" aria-hidden="true" />
          <span className="hud-status-text">STATUS // AGENT READY: SAGE LOCK-IN</span>
        </div>
        <div className="hud-telemetry-pill">
          <span>SERVER: ESP-MADRID</span>
          <span className="hud-sep">|</span>
          <span className="text-platino">14ms · 128Hz</span>
        </div>
      </div>

      {/* Cuadrícula de 4 módulos tácticos */}
      <div className="hud-grid">
        {/* Módulo 1: Identidad & Callsign */}
        <div className="hud-module">
          <div className="hud-corner top-l" /><div className="hud-corner top-r" />
          <div className="hud-corner bot-l" /><div className="hud-corner bot-r" />
          <div className="hud-mod-header">
            <span className="hud-mod-num">01</span>
            <span className="hud-mod-tag">IDENT // PROTOCOL</span>
          </div>
          <h3 className="hud-title">AMY</h3>
          <p className="hud-desc">Sentinel Specialist · Main Sage</p>
          <div className="hud-callsign-box">
            <span>CALLSIGN: #0722</span>
            <span className="text-platino">RANK: PLATINO 2</span>
          </div>
        </div>

        {/* Módulo 2: Navegación Táctica */}
        <nav className="hud-module" aria-label="Navegación de protocolo">
          <div className="hud-corner top-l" /><div className="hud-corner top-r" />
          <div className="hud-corner bot-l" /><div className="hud-corner bot-r" />
          <div className="hud-mod-header">
            <span className="hud-mod-num">02</span>
            <span className="hud-mod-tag">SECTORES // NAV</span>
          </div>
          <ul className="hud-nav-list">
            <li><a href="#agents" className="hud-nav-link"><span className="hud-bullet">&gt;</span> [01] Especialidades</a></li>
            <li><a href="#gear" className="hud-nav-link"><span className="hud-bullet">&gt;</span> [02] Setup Gaming</a></li>
            <li><a href="#shorts" className="hud-nav-link"><span className="hud-bullet">&gt;</span> [03] The Amy Show</a></li>
            <li><a href="#sensCanvas" className="hud-nav-link"><span className="hud-bullet">&gt;</span> [04] Aim Trainer</a></li>
          </ul>
        </nav>

        {/* Módulo 3: Redes & Transmisión */}
        <div className="hud-module">
          <div className="hud-corner top-l" /><div className="hud-corner top-r" />
          <div className="hud-corner bot-l" /><div className="hud-corner bot-r" />
          <div className="hud-mod-header">
            <span className="hud-mod-num">03</span>
            <span className="hud-mod-tag">COMMS // RADAR</span>
          </div>
          <div className="hud-social-stack">
            <a
              href="https://www.tiktok.com/@amyjgil"
              target="_blank"
              rel="noopener noreferrer"
              className="hud-social-item"
            >
              <img src="assets/imagenes/tiktok_art.svg" alt="" width="16" height="16" />
              <span>TIKTOK @amyjgil</span>
              <span className="hud-link-arrow">↗</span>
            </a>
            <a
              href="https://www.youtube.com/@AmyJGil"
              target="_blank"
              rel="noopener noreferrer"
              className="hud-social-item"
            >
              <img src="assets/imagenes/youtube_art.svg" alt="" width="16" height="16" />
              <span>YOUTUBE @AmyJGil</span>
              <span className="hud-link-arrow">↗</span>
            </a>
          </div>
        </div>

        {/* Módulo 4: Telemetría de Combate */}
        <div className="hud-module">
          <div className="hud-corner top-l" /><div className="hud-corner top-r" />
          <div className="hud-corner bot-l" /><div className="hud-corner bot-r" />
          <div className="hud-mod-header">
            <span className="hud-mod-num">04</span>
            <span className="hud-mod-tag">STATS // WINRATE</span>
          </div>
          <div className="hud-stat-row">
            <span className="hud-stat-label">WIN RATE:</span>
            <span className="hud-stat-val text-platino">58.4%</span>
          </div>
          <div className="hud-stat-row">
            <span className="hud-stat-label">K/D RATIO:</span>
            <span className="hud-stat-val text-pink">1.24</span>
          </div>
          <div className="hud-stat-row">
            <span className="hud-stat-label">RESURRECTS:</span>
            <span className="hud-stat-val">340+</span>
          </div>
        </div>
      </div>

      {/* Barra de pie con botón Volver Arriba */}
      <div className="hud-bottom-bar">
        <p className="hud-copy">© 2026 AMY // VALORANT PROTOCOL • ALL RIGHTS RESERVED</p>
        <button
          type="button"
          onClick={onScrollTop}
          className="hud-top-btn"
          aria-label="Volver arriba en la página"
        >
          <span>RECON OVERWATCH ▲</span>
        </button>
      </div>
    </footer>
  );
}

/* =========================================================================
   OPCIÓN B: Bento Glassmorphism Pro
   ========================================================================= */
function FooterBentoGlass({ onScrollTop }) {
  return (
    <footer className="footer-bento" role="contentinfo" aria-label="Pie de página bento glassmorphic">
      <div className="bento-footer-grid">
        {/* Card 1: Identidad AMY (Span 2x1) */}
        <div className="bento-fcard bento-fcard-brand">
          <div className="bento-brand-header">
            <div className="bento-avatar-ring">
              <img src="assets/imagenes/amy_art.webp" alt="Amy" width="48" height="48" />
            </div>
            <div>
              <div className="bento-brand-title">
                <span className="font-cinzel">AMY</span>
                <span className="bento-verified-badge">★ VERIFIED CREATOR</span>
              </div>
              <p className="bento-brand-sub">Main Sage · Platino 2 · Content Creator</p>
            </div>
          </div>
          <p className="bento-brand-quote">
            "Dominio táctico, soporte implacable y las mejores jugadas de Valorant cada semana."
          </p>
        </div>

        {/* Card 2: Rango Platino 2 Highlight */}
        <div className="bento-fcard bento-fcard-rank">
          <div className="bento-rank-top">
            <span className="bento-rank-icon">💎</span>
            <span className="bento-rank-tier">COMPETITIVE</span>
          </div>
          <h4 className="bento-rank-title">PLATINO II</h4>
          <div className="bento-rank-progress">
            <div className="bento-rank-bar"><div className="bento-rank-fill" style={{ width: '74%' }} /></div>
            <span className="bento-rank-rr">74 / 100 RR</span>
          </div>
        </div>

        {/* Card 3: TikTok Hub */}
        <a
          href="https://www.tiktok.com/@amyjgil"
          target="_blank"
          rel="noopener noreferrer"
          className="bento-fcard bento-fcard-social bento-fcard-tiktok"
        >
          <div className="bento-social-top">
            <img src="assets/imagenes/tiktok_art.svg" alt="" width="22" height="22" />
            <span className="bento-arrow-icon">↗</span>
          </div>
          <h4 className="bento-social-name">TikTok</h4>
          <p className="bento-social-handle">@amyjgil</p>
          <span className="bento-social-tag">Ver Highlights & Shorts</span>
        </a>

        {/* Card 4: YouTube Hub */}
        <a
          href="https://www.youtube.com/@AmyJGil"
          target="_blank"
          rel="noopener noreferrer"
          className="bento-fcard bento-fcard-social bento-fcard-youtube"
        >
          <div className="bento-social-top">
            <img src="assets/imagenes/youtube_art.svg" alt="" width="22" height="22" />
            <span className="bento-arrow-icon">↗</span>
          </div>
          <h4 className="bento-social-name">YouTube</h4>
          <p className="bento-social-handle">@AmyJGil</p>
          <span className="bento-social-tag">Partidas completas & Guías</span>
        </a>

        {/* Card 5: Navegación Rápida & Ascender */}
        <div className="bento-fcard bento-fcard-nav">
          <div className="bento-nav-links">
            <a href="#agents">Especialidades</a>
            <a href="#gear">Setup</a>
            <a href="#shorts">The Amy Show</a>
          </div>
          <button
            type="button"
            onClick={onScrollTop}
            className="bento-top-btn"
            aria-label="Ascender a la cima"
          >
            <span>↑ SUBIR</span>
          </button>
        </div>
      </div>

      <div className="bento-footer-bottom">
        <p>© 2026 AMY // Hecho con React 19 + Vite</p>
        <div className="bento-footer-legal">
          <span>VALORANT PORTFOLIO</span>
          <span>•</span>
          <span>MADRID, ESPAÑA</span>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================================
   OPCIÓN C: Editorial Cinematic Monolith
   ========================================================================= */
function FooterCinematicMonolith({ onScrollTop }) {
  return (
    <footer className="footer-monolith" role="contentinfo" aria-label="Pie de página cinemático monolith">
      {/* Línea láser superior */}
      <div className="monolith-laser-horizon" aria-hidden="true">
        <div className="laser-beam" />
      </div>

      {/* Navegación editorial horizontal */}
      <nav className="monolith-nav" aria-label="Navegación editorial">
        <a href="#agents" className="monolith-link">ESPECIALIDADES</a>
        <span className="monolith-dot">•</span>
        <a href="#gear" className="monolith-link">SETUP GEAR</a>
        <span className="monolith-dot">•</span>
        <a href="#shorts" className="monolith-link">THE AMY SHOW</a>
        <span className="monolith-dot">•</span>
        <a href="#sensCanvas" className="monolith-link">AIM LAB</a>
      </nav>

      {/* Píldoras de Redes Sociales */}
      <div className="monolith-socials">
        <a
          href="https://www.tiktok.com/@amyjgil"
          target="_blank"
          rel="noopener noreferrer"
          className="monolith-pill-btn"
        >
          <img src="assets/imagenes/tiktok_art.svg" alt="" width="16" height="16" />
          <span>TIKTOK // @amyjgil</span>
        </a>
        <a
          href="https://www.youtube.com/@AmyJGil"
          target="_blank"
          rel="noopener noreferrer"
          className="monolith-pill-btn"
        >
          <img src="assets/imagenes/youtube_art.svg" alt="" width="16" height="16" />
          <span>YOUTUBE // @AmyJGil</span>
        </a>
      </div>

      {/* Tipografía Escultórica Monumental AMY */}
      <div className="monolith-brand-sculpture" aria-hidden="true">
        <h2 className="monolith-giant-title">AMY</h2>
      </div>

      {/* Badge de Versión del Sistema & Cierre */}
      <div className="monolith-bottom-bar">
        <div className="monolith-sys-badge">
          <span className="monolith-platino-dot" />
          <span>SYS // VAL-PLT2.REL.2026 • SAGE EDITION</span>
        </div>

        <p className="monolith-copy">© 2026 AMY // VALORANT CONTENT CREATOR</p>

        <button
          type="button"
          onClick={onScrollTop}
          className="monolith-ascend-btn"
          aria-label="Ascender al inicio de la página"
        >
          <span>ASCEND ▲</span>
        </button>
      </div>
    </footer>
  );
}
