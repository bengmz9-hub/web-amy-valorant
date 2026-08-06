import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import Agents from './components/Agents.jsx';
import SetupGear from './components/SetupGear.jsx';
import AmyShow from './components/AmyShow.jsx';
import Footer from './components/Footer.jsx';
import { initApp } from './app.js';
import { mountStrands } from './strands.js';

export default function App() {
  // Efectos heredados de la version estatica: se ejecutan tras el primer render,
  // cuando el DOM de React ya existe (mismos IDs/selectores que el HTML original).
  useEffect(() => {
    initApp();
    mountStrands();
  }, []);

  return (
    <>
      <div className="cursor-glow"></div>
      <div className="global-bg"></div>
      <div className="agent-bg-overlay"></div>

      <img
        src="https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/fullportrait.png"
        className="side-agent agent-left" alt="" width="220" height="440" loading="lazy"
        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.display = 'none'; }}
      />
      <img
        src="https://media.valorant-api.com/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417/fullportrait.png"
        className="side-agent agent-right" alt="" width="220" height="440" loading="lazy"
        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.display = 'none'; }}
      />

      <div id="scrollBar"></div>

      <Navbar />

      <main id="main" aria-label="Contenido principal">
        <Hero />
        <div className="hero-stats-blend"></div>
        <Stats />
        <Agents />
        <SetupGear />
        <AmyShow />
      </main>

      <Footer />
    </>
  );
}
