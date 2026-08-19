// Stats — bento grid con stagger al entrar (estilo Folira) + carrusel de agentes debajo.
// Datos reales (no inventar): 2500+ horas, 51% WR, 284 followers, Platino 2.
// CSS: .stats-section .bento-card (stagger) y .stats-carousel en index.css.
import { useEffect, useRef } from 'react';
import AgentCarousel from './AgentCarousel.jsx';

const STATS = [
  {
    value: '2500+',
    label: 'Horas Jugadas',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2 2" />
        <path d="M9 2h6" />
        <path d="M12 2v2" />
      </svg>
    ),
  },
  {
    value: '51%',
    label: 'Win Rate',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    value: '284',
    label: 'TikTok Followers',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        <path d="M16 8h.01" />
        <path d="M8 8h.01" />
      </svg>
    ),
  },
  {
    value: 'Platino 2',
    label: 'Rango Actual',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.25C17.25 23.15 21 18.25 21 13V7L12 2z" />
        <path d="M12 8v4" />
        <path d="M12 16l2-2" />
      </svg>
    ),
  },
];

export default function Stats() {
  const sectionRef = useRef(null);

  // Stagger: las tarjetas entran en cascada cuando la sección entra en el viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('stats-in');
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => el.classList.toggle('stats-in', e.isIntersecting));
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="stats-section" aria-label="Estadísticas de rendimiento y agentes">
      <h2 className="sr-only">Rendimiento táctico y agentes principales</h2>
      <div className="bento-grid">
        {STATS.map((stat, i) => (
          <div className="bento-card" key={stat.label} style={{ transitionDelay: i * 90 + 'ms' }}>
            <div className="bento-card-accent" />
            <div className="bento-card-icon">{stat.icon}</div>
            <span className="bento-card-number">{stat.value}</span>
            <span className="bento-card-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="stats-carousel">
        <AgentCarousel />
      </div>
    </section>
  );
}
