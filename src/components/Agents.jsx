import { useState, useRef } from 'react';
import WordReveal from './WordReveal.jsx';

const AGENTS = [
  {
    id: 'sage',
    name: 'SAGE',
    img: 'sage_art',
    w: 800,
    h: 446,
    alt: 'Sage, agente main de Amy en Valorant',
    desc: 'Dominio del control de terreno y sostenibilidad del equipo. Especialista en salvaguardar la ventaja táctica.',
    emoji: '❄️',
    percent: 45,
    gradient: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
    abilities: {
      C: { name: 'Orbe de Barrera (Control)', desc: 'Uso el muro principalmente para asegurar el site' },
      Q: { name: 'Orbe de Ralentización (Q)', desc: 'Perfecto para relentizar o detener ejecuciones enemigas rápidas' },
      E: { name: 'Orbe de Curación (E)', desc: 'Lo utilizo para curar a mi equipo o a mi misma' },
      X: { name: 'Resurrección (X)', desc: 'Busco revivir a compañeros' },
    },
  },
  {
    id: 'gekko',
    name: 'GEKKO',
    img: 'gekko_art',
    w: 800,
    h: 533,
    alt: 'Gekko, agente de inteligencia móvil que Amy usa en Valorant',
    desc: 'Inteligencia móvil y reconocimiento dinámico. Especialista en disrupción del posicionamiento enemigo.',
    emoji: '🦎',
    percent: 35,
    gradient: 'linear-gradient(90deg, #4ade80, #a3e635)',
    abilities: {
      C: { name: 'Mosh Pit (Control)', desc: 'Granada de gran daño. La uso para denegar el defuse post-plant o limpiar esquinas cerradas.' },
      Q: { name: 'Wingman (Q)', desc: '¡El main de Gekko! Plantar o defusar a distancia mientras cubro otros ángulos es clave.' },
      E: { name: 'Dizzy (E)', desc: 'Flash de información. Si Dizzy dispara su pintura azul, ya sé la posición exacta del enemigo.' },
      X: { name: 'Thrash (X)', desc: 'La definitiva. Permite limpiar el site entero y retener a los enemigos para un push fácil.' },
    },
  },
  {
    id: 'brimstone',
    name: 'BRIMSTONE',
    img: 'brimstone_art',
    w: 800,
    h: 500,
    alt: 'Brimstone, agente de control y liderazgo que Amy usa en Valorant',
    desc: 'Liderazgo estratégico y control zonal mediante fuego táctico. Capacidad de orquestar ofensivas coordinadas.',
    emoji: '🔥',
    percent: 20,
    gradient: 'linear-gradient(90deg, #ff8c00, #ffa726)',
    abilities: {
      C: { name: 'Baliza de Estimulante (Control)', desc: 'Aumenta la cadencia. La tiro justo antes de entrar a un site para dar ventaja en los duelos.' },
      Q: { name: 'Incendiario (Q)', desc: 'Molly clásica. Esencial para denegar plantados o tapar cuellos de botella.' },
      E: { name: 'Humo del Cielo (E)', desc: 'Tres humos de larga duración. Bloqueo visual instantáneo para ejecutar entradas limpias.' },
      X: { name: 'Golpe Orbital (X)', desc: 'Limpio posiciones comunes de defensa o aseguro la ronda denegando el defuse.' },
    },
  },
];

const SVG_FALLBACK =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800' viewBox='0 0 600 800'><rect width='100%' height='100%' fill='%230f1923'/><text x='50%' y='50%' fill='%23ff4655' font-family='monospace' font-size='24' text-anchor='middle' dy='.3em'>VALORANT TACTICAL ASSET</text></svg>";

function handleImgError(e) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = SVG_FALLBACK;
}

function AgentCard({ agent }) {
  const [activeTab, setActiveTab] = useState('C');
  const cardRef = useRef(null);

  const currentAbility = agent.abilities[activeTab] || agent.abilities['C'];

  const handleMouseMove = (e) => {
    // Solo aplicar rotación 3D en pantallas con ratón/hover real
    if (window.matchMedia && !window.matchMedia('(hover: hover)').matches) return;

    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = -(y - yc) / 40;
    const rotateY = (x - xc) / 40;

    requestAnimationFrame(() => {
      if (card) {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
      }
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    requestAnimationFrame(() => {
      if (card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }
    });
  };

  return (
    <div
      ref={cardRef}
      className="game-card fade-in-section hud-corners-container"
      data-agent={agent.id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="img-container">
        <picture>
          <source
            srcSet={`assets/imagenes/${agent.img}_400.avif 400w, assets/imagenes/${agent.img}.avif 800w`}
            sizes="(max-width: 900px) 280px, 300px"
            type="image/avif"
          />
          <img
            src={`assets/imagenes/${agent.img}.webp`}
            srcSet={`assets/imagenes/${agent.img}_400.webp 400w, assets/imagenes/${agent.img}.webp 800w`}
            sizes="(max-width: 900px) 280px, 300px"
            width={agent.w}
            height={agent.h}
            alt={agent.alt}
            loading="lazy"
            decoding="async"
            onError={handleImgError}
          />
        </picture>
        <h3 className="agent-name-overlay">{agent.name}</h3>
      </div>
      <div className="info">
        <p>{agent.desc}</p>
        <div className="abilities-container">
          <div className="ability-tabs" role="tablist" aria-label={`Habilidades tácticas de ${agent.name}`}>
            {['C', 'Q', 'E', 'X'].map((key) => (
              <button
                key={key}
                role="tab"
                aria-selected={activeTab === key}
                aria-label={`Habilidad ${key}: ${agent.abilities[key]?.name}`}
                className={`ability-tab ${activeTab === key ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab(key);
                }}
              >
                {key === 'C' ? 'Ctrl' : key}
              </button>
            ))}
          </div>
          <div className="ability-info-box" role="tabpanel">
            <h4 className="ability-name">{currentAbility.name}</h4>
            <div className="ability-desc">{currentAbility.desc}</div>
          </div>
        </div>
        <div className="usage-stats">
          <div className="usage-header">
            <span>{agent.emoji} tasa de uso</span>
            <span className="usage-percent">{agent.percent}%</span>
          </div>
          <div className="usage-bar-bg">
            <div className="usage-bar-fill" style={{ width: `${agent.percent}%`, background: agent.gradient }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Agents() {
  return (
    <section id="agents">
      <div className="section-title fade-in-section">
        <WordReveal as="h2" parts={[{ t: 'Especialidades' }, { t: 'Tácticas', hl: true }]} />
        <p>Sinergia operativa con agentes de control y soporte.</p>
      </div>
      <div className="cards-grid">
        {AGENTS.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </section>
  );
}
