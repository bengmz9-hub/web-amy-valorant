import { useEffect } from 'react';
import NavbarAceternity from './components/NavbarAceternity.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import Agents from './components/Agents.jsx';
import SetupGear from './components/SetupGear.jsx';
import AmyShow from './components/AmyShow.jsx';
import Footer from './components/Footer.jsx';
import { initApp } from './app.js';

export default function App() {
  useEffect(() => {
    const cleanup = initApp();
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  return (
    <>
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
