// NavbarAceternity — píldora flotante (Aceternity-style) adaptada a tokens reales.
// Fixes: id="modeBtn" en el botón del navbar, colores -> var(), sin id duplicado en el panel.
// Clases ac-* en index.css. Reversible: App.jsx + borrar bloque CSS.
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#agents", label: "Especialidades" },
  { href: "#gear", label: "Setup" },
  { href: "#shorts", label: "Amy Show" },
];

export default function NavbarAceternity() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <div ref={ref}>
      <nav className={`ac-nav${open ? " ac-open" : ""}`} aria-label="Principal">
        <a href="#" className="ac-logo">
          <span className="ac-logo__dot" aria-hidden="true" />
          AMY
        </a>

        <ul className="ac-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="ac-link">{l.label}</a>
            </li>
          ))}
        </ul>

        <span className="ac-sep" aria-hidden="true" />

        {/* Redes sociales — mismo estilo pill que Ver Clips */}
        <a
          href="https://www.tiktok.com/@amyjgil"
          target="_blank"
          rel="noopener noreferrer"
          className="ac-social"
          aria-label="TikTok de AMY (se abre en una nueva pestaña)"
        >
          <img src="assets/imagenes/tiktok_art.svg" alt="" className="ac-social__icon" width="18" height="18" />
        </a>
        <a
          href="https://www.youtube.com/@AmyJGil"
          target="_blank"
          rel="noopener noreferrer"
          className="ac-social"
          aria-label="YouTube de AMY (se abre en una nueva pestaña)"
        >
          <img src="assets/imagenes/youtube_art.svg" alt="" className="ac-social__icon" width="19" height="19" />
        </a>

        {/* modeBtn: id real para que app.js lo enganche (modo competitivo) */}
        <button className="ac-icon" id="modeBtn" aria-label="Cambiar modo competitivo">🖤</button>

        <a href="#shorts" className="ac-cta">VER CLIPS</a>

        <button
          className="ac-burger"
          aria-expanded={open}
          aria-controls="ac-panel"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Panel móvil flotante */}
      <div id="ac-panel" className="ac-panel" aria-hidden={!open}>
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            className="ac-item"
            style={{ "--i": i }}
            onClick={() => setOpen(false)}
          >
            <span className="ac-item__num">0{i + 1}</span>
            {l.label}
            <span className="ac-item__arrow" aria-hidden="true">›</span>
          </a>
        ))}
        <div className="ac-panel__foot">
          <span className="ac-panel__hint">Platino 2 · Main Sage</span>
          {/* sin id para no duplicar el enganche de app.js */}
          <button className="ac-icon" aria-label="Cambiar modo competitivo">🖤</button>
        </div>
      </div>
    </div>
  );
}
