export default function Stats() {
  return (
    <section className="stats-section fade-in-section">
      <div className="stats-container">
        <div className="stat-card">
          <span className="font-extrabold text-3xl tracking-tight stat-number">
            2500+
          </span>
          <div className="stat-label">Horas Jugadas</div>
        </div>
        <div className="stat-card">
          <span className="font-extrabold text-3xl tracking-tight stat-number">
            51%
          </span>
          <div className="stat-label">Win Rate</div>
        </div>
        <div className="stat-card">
          <span className="font-extrabold text-3xl tracking-tight stat-number">
            284
          </span>
          <div className="stat-label">TikTok Followers</div>
        </div>
        <div className="stat-card">
          <span className="font-extrabold text-3xl tracking-tight stat-number" style={{ fontSize: '2rem' }}>
            Platino 2
          </span>
          <div className="stat-label">Rango Actual</div>
        </div>
      </div>
    </section>
  );
}
