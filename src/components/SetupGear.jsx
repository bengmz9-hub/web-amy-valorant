import { useState } from 'react';
import WordReveal from './WordReveal.jsx';
import AimTrainer from './AimTrainer.jsx';

const GEAR = [
  { cat: 'perifericos', icon: '🖱️', name: 'Ratón', value: 'Logitech G Pro X Superlight', spec: 'Peso: 63g | Sensor: Hero 25K', status: '✓ Main actual' },
  { cat: 'perifericos', icon: '🎯', name: 'Sensibilidad', value: '800 DPI | 0.51 In-game', spec: 'eDPI: 280 | Polling Rate: 1000Hz', bar: 51 },
  { cat: 'perifericos', icon: '🖥️', name: 'Monitor', value: 'ASUS ROG Strix XG27ACS-W', spec: '27" QHD Fast IPS | 180Hz', status: '✓ En uso' },
  { cat: 'perifericos', icon: '⌨️', name: 'Teclado', value: 'Wooting 60HE', spec: 'Switches magnéticos | Rapid Trigger', status: '✓ Main actual' },
  { cat: 'perifericos', icon: '🎧', name: 'Auriculares', value: 'Sennheiser HD555', spec: 'Sonido de alta fidelidad' },
  { cat: 'perifericos', icon: '🎙️', name: 'Micrófono', value: 'Blue Yeti Blanco', spec: 'Condensador USB | Múltiples patrones' },
  { cat: 'pc', icon: '⚙️', name: 'Procesador', value: 'Intel Core i9 13900k', spec: '24 Núcleos | 5.8 GHz Turbo' },
  { cat: 'pc', icon: '🎮', name: 'Tarjeta Gráfica', value: 'Nvidia RTX 4090', spec: '24GB GDDR6X' },
  { cat: 'pc', icon: '🧠', name: 'Memoria RAM', value: 'Corsair Vengeance 64GB', spec: '2x32GB | DDR5 6000MHz' },
  { cat: 'pc', icon: '🗄️', name: 'Caja PC', value: 'Aerocool P500C Blanca', spec: 'ARGB Vidrio Templado | ATX / M-ATX | 4 Fans' },
  { cat: 'pc', icon: '💾', name: 'Disco Duro', value: 'Samsung 990 Pro 1TB', spec: 'NVMe PCIe 4.0 M.2 | 7450MB/s' }
];

const FILTERS = [
  { key: 'all', label: 'Todo el Equipo' },
  { key: 'perifericos', label: 'Periféricos' },
  { key: 'pc', label: 'Componentes PC' }
];

/* ── Bento Asimétrico 12-col (Opción A) ──────────────────────────── */
function GearBento({ items }) {
  const featured = items[0];
  const rest = items.slice(1);
  return (
    <div className="bga-grid">
      {featured && (
        <div className="bga-card bga-feat">
          <span className="bga-card-label">{featured.icon} {featured.name}</span>
          <span className="bga-card-value">{featured.value}</span>
          <span className="bga-card-spec">{featured.spec}</span>
          {featured.status && <span className="bga-card-status">{featured.status}</span>}
        </div>
      )}
      {rest.map((g, i) => {
        // Patrón: 4, 4, 4, 4, 8, 4, 4, 4, 8, 4
        const span = (i % 5 === 4) ? 'bga-wide' : 'bga-half';
        return (
          <div className={`bga-card ${span}`} key={g.name}>
            <span className="bga-card-label">{g.icon} {g.name}</span>
            <span className="bga-card-value">{g.value}</span>
            <span className="bga-card-spec">{g.spec}</span>
            {g.status && <span className="bga-card-status">{g.status}</span>}
            {g.bar && (
              <div className="bga-bar"><div className="bga-bar-fill" style={{ width: `${g.bar}%` }}></div></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function SetupGear() {
  const [filter, setFilter] = useState('all');
  const items = filter === 'all' ? GEAR : GEAR.filter(g => g.cat === filter);

  return (
    <section id="gear" className="setup-gear fade-in-section">
      <div className="section-title">
        <WordReveal as="h2" parts={[{ t: 'Mi Setup' }, { t: '& Gear', hl: true }]} />
        <p>Herramientas de precisión para el máximo rendimiento.</p>
      </div>

      <div className="gear-filters" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`filter-btn ${filter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <GearBento items={items} />
      </div>

      <AimTrainer />
    </section>
  );
}
