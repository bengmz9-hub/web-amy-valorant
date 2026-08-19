import WordReveal from '@/components/ui/WordReveal.jsx';

export default function Hero() {
  return (
    <section className="hero relative w-full min-h-screen [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
      {/* video sageAURA de fondo: WebM 1280x720 idéntico en encuadre (optimizado VP9) */}
      <video className="bg-video" autoPlay muted loop playsInline aria-hidden="true" tabIndex="-1" poster="assets/imagenes/amy_art.webp">
        <source src="assets/imagenes/sageAURA.webm" type="video/webm" />
        <source src="assets/imagenes/sageAURA.mp4" type="video/mp4" />
      </video>

      <div className="grain"></div>
      <div className="dust"></div><div className="dust"></div><div className="dust"></div>
      <div className="dust"></div><div className="dust"></div><div className="dust"></div>

      <div className="hero-inner">
        <div className="hero-copy">
          <WordReveal as="h1" mode="letters" className="hero-title" parts={[{ t: 'Amy valorant' }, { t: 'player' }]} />

          <p className="hero-desc">
            ¡Hola! Soy Amy y este es mi rincón de Valorant. Juego en <b className="platino">Platino 3</b> y soy
            <span className="pink"> main Sage</span>: la que cura, la que resucita y la que aguanta.
            Aquí comparto mis clips, mis guías y mi setup, para que aprendas conmigo y
            mejores partida a partida. Esto es para todos: si juegas, si quieres empezar,
            o si solo vienes a ver buenas jugadas, quédate un rato.
            Subo contenido cada semana en TikTok y YouTube, siempre con buenas vibras.
          </p>

          <div className="cta-row">
            <a href="#shorts" className="hero-cta-card hero-cta-primary">
              <span className="cta-card-icon">🎬</span>
              <div className="cta-card-content">
                <span className="cta-card-title">Ver Clips</span>
                <span className="cta-card-sub">Últimos highlights</span>
              </div>
              <span className="cta-card-arrow" aria-hidden="true">→</span>
            </a>

            <a href="#gear" className="hero-cta-card hero-cta-secondary">
              <span className="cta-card-icon">⚙️</span>
              <div className="cta-card-content">
                <span className="cta-card-title">Mi Setup</span>
                <span className="cta-card-sub">Periféricos & PC</span>
              </div>
              <span className="cta-card-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          {/* Portrait AMY: Estilo Player Card Táctico */}
          <div className="card-amy portrait-card">
            <div className="portrait-corner top-left"></div>
            <div className="portrait-corner bottom-right"></div>
            <div className="portrait-badge">
              <span className="badge-dot"></span> AMY // CREATOR
            </div>
            <div className="portrait-img-wrapper">
              <img src="assets/imagenes/amy_art.webp" alt="Amy, jugadora de Valorant Platino 3 y creadora de contenido" width="600" height="710" fetchPriority="high" />
            </div>
            <div className="portrait-footer">
              <span className="portrait-tag">MAIN SAGE</span>
              <span className="portrait-code">SYS-02</span>
            </div>
          </div>

          {/* Portrait SAGE: Estilo Agent Card */}
          <div className="card-sage portrait-card">
            <div className="portrait-corner top-left"></div>
            <div className="portrait-corner bottom-right"></div>
            <div className="portrait-badge sage-badge">
              VALORANT // AGENT #07
            </div>
            <div className="portrait-img-wrapper">
              <img src="assets/imagenes/sage-wallpaper.jpg" alt="Sage, agente centinela de soporte en Valorant" width="1920" height="1080" loading="lazy" decoding="async" />
            </div>
            <div className="portrait-footer">
              <span className="portrait-tag">SENTINEL</span>
              <span className="portrait-code">RADIANITE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
