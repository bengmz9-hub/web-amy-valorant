export default function Hero() {
  return (
    <section className="hero relative w-full min-h-screen [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
      {/* video sageAURA de fondo: prioriza MP4 (8MB HD) sobre WEBM (1.1MB comprimido) */}
      <video className="bg-video" autoPlay muted loop playsInline poster="assets/imagenes/amy_art.webp">
        <source src="assets/imagenes/sageAURA.mp4" type="video/mp4" />
        <source src="assets/imagenes/sageAURA.webm" type="video/webm" />
      </video>

      <div className="grain"></div>
      <div className="dust"></div><div className="dust"></div><div className="dust"></div>
      <div className="dust"></div><div className="dust"></div><div className="dust"></div>

      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-title">Amy valorant<br />player</h1>

          <p className="hero-desc">
            ¡Hola! Soy Amy y este es mi rincón de Valorant. Juego en <b className="platino">Platino 2</b> y soy
            <span className="pink"> main Sage</span>: la que cura, la que resucita y la que aguanta.
            Aquí comparto mis clips, mis guías y mi setup, para que aprendas conmigo y
            mejores partida a partida. Esto es para todos: si juegas, si quieres empezar,
            o si solo vienes a ver buenas jugadas, quédate un rato.
            Subo contenido cada semana en TikTok y YouTube, siempre con buenas vibras.
          </p>

          <div className="cta-row">
            <button className="bg-[#FF2E88] hover:bg-[#FF7AB5] text-[#FFF6FA] font-bold px-6 py-2.5 rounded-full shadow-[0_0_25px_rgba(255,46,136,0.4)] transition-all transform hover:-translate-y-0.5">Ver clips</button>
            <a href="#gear" className="btn-ghost">Mi setup <span className="arrow">→</span></a>
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
              <img src="assets/imagenes/amy_art.webp" alt="AMY" />
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
              <img src="assets/imagenes/sage-wallpaper.jpg" alt="Sage" />
            </div>
            <div className="portrait-footer">
              <span className="portrait-tag cyan">SENTINEL</span>
              <span className="portrait-code">RADIANITE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
