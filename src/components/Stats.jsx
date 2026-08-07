// Stats — OPCIÓN C: Tarjetas glass elegante (iconos SVG + números accent).
// Clases bento-* ya en index.css. Reversible.
export default function Stats() {
  const stats = [
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

  return (
    <section className="stats-section fade-in-section">
      <div className="bento-grid">
        {stats.map((stat, i) => (
          <div className="bento-card" key={i}>
            <div className="bento-card-accent" />
            <div className="bento-card-icon">{stat.icon}</div>
            <span className="bento-card-number">{stat.value}</span>
            <span className="bento-card-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
