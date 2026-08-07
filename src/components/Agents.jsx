import WordReveal from './WordReveal.jsx';
const AGENTS = [
  {
    id: 'sage',
    name: 'SAGE',
    img: 'sage_art',
    w: 800, h: 446,
    alt: 'Sage, agente main de Amy en Valorant',
    desc: 'Dominio del control de terreno y sostenibilidad del equipo. Especialista en salvaguardar la ventaja táctica.',
    abilityName: 'Orbe de Barrera (Ctrl)',
    abilityDesc: 'Uso el muro principalmente para asegurar el site.',
    emoji: '❄️', percent: 45,
    gradient: 'linear-gradient(90deg, #3b82f6, #60a5fa)'
  },
  {
    id: 'gekko',
    name: 'GEKKO',
    img: 'gekko_art',
    w: 800, h: 533,
    alt: 'Gekko, agente de inteligencia móvil que Amy usa en Valorant',
    desc: 'Inteligencia móvil y reconocimiento dinámico. Especialista en disrupción del posicionamiento enemigo.',
    abilityName: 'Mosh Pit (Ctrl)',
    abilityDesc: 'Granada de gran daño. La uso para denegar el defuse post-plant o limpiar esquinas cerradas.',
    emoji: '🦎', percent: 35,
    gradient: 'linear-gradient(90deg, #4ade80, #a3e635)'
  },
  {
    id: 'brimstone',
    name: 'BRIMSTONE',
    img: 'brimstone_art',
    w: 800, h: 500,
    alt: 'Brimstone, agente de control y liderazgo que Amy usa en Valorant',
    desc: 'Liderazgo estratégico y control zonal mediante fuego táctico. Capacidad de orquestar ofensivas coordinadas.',
    abilityName: 'Baliza de Estimulante (Ctrl)',
    abilityDesc: 'Aumenta la cadencia. La tiro justo antes de entrar a un site para dar ventaja en los duelos.',
    emoji: '🔥', percent: 20,
    gradient: 'linear-gradient(90deg, #ff8c00, #ffa726)'
  }
];

function handleImgError(e, fallback) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = fallback;
}

export default function Agents() {
  return (
    <section id="agents">
      <div className="section-title fade-in-section">
        <WordReveal as="h2" parts={[{ t: 'Especialidades' }, { t: 'Tácticas', hl: true }]} />
        <p>Sinergia operativa con agentes de control y soporte.</p>
      </div>
      <div className="cards-grid">
        {AGENTS.map((a) => (
          <div className="game-card fade-in-section hud-corners-container" data-agent={a.id} key={a.id}>
            <div className="img-container">
              <picture>
                <source srcSet={`assets/imagenes/${a.img}_400.avif 400w, assets/imagenes/${a.img}.avif 800w`} sizes="(max-width: 900px) 280px, 300px" type="image/avif" />
                <img
                  src={`assets/imagenes/${a.img}.webp`}
                  srcSet={`assets/imagenes/${a.img}_400.webp 400w, assets/imagenes/${a.img}.webp 800w`}
                  sizes="(max-width: 900px) 280px, 300px"
                  width={a.w} height={a.h}
                  alt={a.alt}
                  loading="lazy" decoding="async"
                  onError={(e) => handleImgError(e, `https://placehold.co/600x800/0f1923/ffffff?text=${a.name}`)}
                />
              </picture>
              <h3 className="agent-name-overlay">{a.name}</h3>
            </div>
            <div className="info">
              <p>{a.desc}</p>
              <div className="abilities-container">
                <div className="ability-tabs">
                  <button className="ability-tab active" data-ability="C">Ctrl</button>
                  <button className="ability-tab" data-ability="Q">Q</button>
                  <button className="ability-tab" data-ability="E">E</button>
                  <button className="ability-tab" data-ability="X">X</button>
                </div>
                <div className="ability-info-box">
                  <h4 className="ability-name">{a.abilityName}</h4>
                  <div className="ability-desc">{a.abilityDesc}</div>
                </div>
              </div>
              <div className="usage-stats">
                <div className="usage-header"><span>{a.emoji} tasa de uso</span><span className="usage-percent">{a.percent}%</span></div>
                <div className="usage-bar-bg"><div className="usage-bar-fill" style={{ width: `${a.percent}%`, background: a.gradient }}></div></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
