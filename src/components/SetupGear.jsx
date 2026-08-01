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

export default function SetupGear() {
  return (
    <section id="gear" className="setup-gear fade-in-section">
      <div className="section-title">
        <h2>Mi Setup <span className="highlight">& Gear</span></h2>
        <p>Herramientas de precisión para el máximo rendimiento.</p>
      </div>
      <div className="gear-filters">
        <button className="filter-btn active" data-filter="all">Todo el Equipo</button>
        <button className="filter-btn" data-filter="perifericos">Periféricos</button>
        <button className="filter-btn" data-filter="pc">Hardware PC</button>
      </div>
      <div className="gear-container">
        {GEAR.map((g) => (
          <div className="gear-item" data-category={g.cat} key={g.name}>
            <h3>{g.icon} {g.name}</h3>
            <p>{g.value}</p>
            <div className="gear-item-spec">{g.spec}</div>
            {g.status && <span className="gear-status in-stock">{g.status}</span>}
            {g.bar && (
              <div className="sensitivity-bar"><div className="bar-fill" style={{ width: `${g.bar}%` }}></div></div>
            )}
          </div>
        ))}
      </div>

      {/* AIM TRAINER */}
      <div className="simulator-box">
        <h3>🎯 Desafío de Puntería</h3>
        <p style={{ marginBottom: '0.8rem', color: 'var(--text-sub)' }}>Mueve el ratón dentro del recuadro para apuntar y haz clic para disparar.</p>
        <div id="aimStats" className="aim-stats">
          <div>DIANAS: <span id="aimScore">0</span></div>
          <div>PRECISIÓN: <span id="aimAccuracy">100%</span></div>
          <div>TIEMPO: <span id="aimTime">10s</span></div>
        </div>
        <canvas id="sensCanvas" className="sim-canvas" width="800" height="400" style={{ width: '100%', maxWidth: '800px', height: 'auto' }}></canvas>
        <div className="simulator-controls">
          <button id="startAimBtn" className="filter-btn active" style={{ fontSize: '0.85rem', padding: '0.5rem 1.5rem', borderRadius: '100px' }}>Iniciar Juego 🎯</button>
        </div>
      </div>
    </section>
  );
}
