// AgentCarousel — carrusel de Agent Cards estilo card-sage (wayfinder #3, v4)
// AUTOPLAY: rota solo cada 3.5s (loop), pausa en hover/touch, respeta prefers-reduced-motion.
// 3 tarjetas: Sage (#07, existente), Brimstone (Controlador), Gekko (Iniciador).
// Datos de rol verificados vía valorant-api.com (es-ES). Tasas de uso reales de Agents.jsx.
// Imágenes en public/assets/imagenes/ (sage-wallpaper.jpg, brimstone-wallpaper.jpg, gekko-wallpaper.jpg).
import { useEffect, useRef, useState } from 'react';

const AUTOPLAY_MS = 3500;

const agents = [
  {
    key: 'sage',
    badge: 'VALORANT // AGENT #07',
    img: 'assets/imagenes/sage-wallpaper.jpg',
    alt: 'Sage',
    tag: 'SENTINEL',
    code: 'RADIANITE',
  },
  {
    key: 'brimstone',
    badge: 'VALORANT // CONTROLLER',
    img: 'assets/imagenes/brimstone-wallpaper.jpg',
    alt: 'Brimstone',
    tag: 'CONTROLLER',
    code: '20% USO',
  },
  {
    key: 'gekko',
    badge: 'VALORANT // INITIATOR',
    img: 'assets/imagenes/gekko-wallpaper.jpg',
    alt: 'Gekko',
    tag: 'INITIATOR',
    code: '35% USO',
  },
];

export default function AgentCarousel() {
  const track = useRef(null);
  const paused = useRef(false);
  const [idx, setIdx] = useState(0);

  const step = () => {
    const el = track.current;
    if (!el) return 0;
    const card = el.querySelector('.ac-card');
    return card ? card.offsetWidth + 24 : el.clientWidth;
  };

  const go = (dir) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * step(), behavior: 'smooth' });
  };

  const goTo = (i) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: i * step(), behavior: 'smooth' });
  };

  // Autoplay: rota cada AUTOPLAY_MS, loop al llegar al final, pausa en hover/touch
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => {
      if (paused.current) return;
      const el = track.current;
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 4) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: step(), behavior: 'smooth' });
      }
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, []);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / step());
    setIdx(Math.max(0, Math.min(agents.length - 1, i)));
  };

  return (
    <div
      className="ac-wrap"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      onTouchStart={() => { paused.current = true; }}
      onTouchEnd={() => { paused.current = false; }}
    >
      <div className="ac-track" ref={track} onScroll={onScroll} aria-label="Agentes que juega Amy">
        {agents.map((a, i) => {
          // Coverflow 3D: la activa de frente, las vecinas rotadas en perspectiva
          const offset = i - idx;
          const transform =
            'translateX(' + offset * -18 + 'px) rotateY(' + offset * -24 + 'deg) scale(' + (offset === 0 ? 1 : 0.86) + ')';
          return (
            <div
              className={'card-sage portrait-card ac-card' + (a.key !== 'sage' ? ' ac-card--' + a.key : '')}
              key={a.key}
              style={{ transform, zIndex: offset === 0 ? 2 : 1, opacity: offset === 0 ? 1 : 0.88 }}
            >
              <div className="portrait-corner top-left"></div>
              <div className="portrait-corner bottom-right"></div>
              <div className="portrait-badge sage-badge">{a.badge}</div>
              <div className="portrait-img-wrapper">
                <img
                  src={a.img}
                  alt={a.alt}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div className="portrait-footer">
                <span className="portrait-tag">{a.tag}</span>
                <span className="portrait-code">{a.code}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="ac-controls">
        <button type="button" className="ac-arrow" onClick={() => go(-1)} aria-label="Agente anterior">‹</button>
        <div className="ac-dots">
          {agents.map((a, i) => (
            <button
              type="button"
              key={a.key}
              className={'ac-dot' + (i === idx ? ' ac-dot--active' : '')}
              onClick={() => goTo(i)}
              aria-label={'Agente ' + (i + 1)}
            />
          ))}
        </div>
        <button type="button" className="ac-arrow" onClick={() => go(1)} aria-label="Agente siguiente">›</button>
      </div>
    </div>
  );
}
