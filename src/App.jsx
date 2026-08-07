import { useEffect } from 'react';
import NavbarAceternity from './components/NavbarAceternity.jsx';
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

      <div id="scrollBar"></div>

      <NavbarAceternity />

      <main id="main" aria-label="Contenido principal">
        <Hero />
        <Stats />
        <Agents />
        <SetupGear />
        <AmyShow />
      </main>

      <Footer />
    </>
  );
}
