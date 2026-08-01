export default function Hero() {
  return (
    <header className="hero">
      {/* video sageAURA de fondo: contenedor propio 72% centrado, fade uniforme en los 4 lados */}
      <video className="bg-video" autoPlay muted loop playsInline poster="assets/imagenes/amy_art.webp">
        <source src="assets/imagenes/sageAURA.webm" type="video/webm" />
        <source src="assets/imagenes/sageAURA.mp4" type="video/mp4" />
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
            <a href="#shorts" className="btn-pink">Ver clips</a>
            <a href="#gear" className="btn-ghost">Mi setup <span className="arrow">→</span></a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="card-amy">
            <img src="assets/imagenes/amy_art.webp" alt="AMY" />
          </div>
          <div className="card-sage">
            <img src="assets/imagenes/sage-wallpaper.jpg" alt="Sage" />
          </div>
        </div>
      </div>
    </header>
  );
}
