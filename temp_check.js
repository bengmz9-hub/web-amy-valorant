
  (function() {
    'use strict';

    // Helper seguro para localStorage (evita excepciones de seguridad en entornos sandbox/iframe)
    const safeStorage = {
      getItem(key) {
        try {
          return localStorage.getItem(key);
        } catch (e) {
          return null;
        }
      },
      setItem(key, value) {
        try {
          localStorage.setItem(key, value);
        } catch (e) {}
      }
    };

    // Modo competitivo
    const modeBtn = document.getElementById('modeBtn');
    const isCompMode = safeStorage.getItem('amy-comp-mode') === 'true';
    if (isCompMode) {
      document.body.classList.add('comp-mode');
      modeBtn.textContent = '🛡️';
    } else {
      document.body.classList.remove('comp-mode');
      modeBtn.textContent = '🖤';
    }

    let selectedAgentColor = null;
    let selectedAgent = null;
    const agentBgOverlay = document.querySelector('.agent-bg-overlay');
    const agentBgImages = {
      sage: 'sage_art.avif',
      gekko: 'gekko_art.avif',
      brimstone: 'brimstone_art.avif'
    };
    const agentColors = {
      sage: '#3b82f6',
      gekko: '#4ade80',
      brimstone: '#ff8c00'
    };

    function restoreAgentBg() {
      if (selectedAgent && agentBgImages[selectedAgent]) {
        agentBgOverlay.style.backgroundImage = `url('${agentBgImages[selectedAgent]}')`;
        agentBgOverlay.classList.add('active');
      } else {
        agentBgOverlay.classList.remove('active');
      }
    }

    function getDefaultAccentColor() {
      return document.body.classList.contains('comp-mode') ? '#ff4655' : '#ff71ce';
    }

    function setAccentColor(color) {
      document.documentElement.style.setProperty('--accent', color);
      document.documentElement.style.setProperty('--accent-glow', color + '80');
      document.documentElement.style.setProperty('--accent-radial', color + '0D');
      const svgCursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${encodeURIComponent(color)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/></svg>') 12 12, crosshair`;
      document.body.style.cursor = svgCursor;
    }

    function restoreAccentColor() {
      if (selectedAgentColor) {
        setAccentColor(selectedAgentColor);
      } else {
        setAccentColor(getDefaultAccentColor());
      }
    }

    // Control de Audio y Paisajes Sonoros Sintetizados
    let audioCtx = null;
    let audioEnabled = safeStorage.getItem('amy-audio-enabled') === 'true';
    const audioBtn = document.getElementById('audioBtn');
    
    function initAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }

    if (audioBtn) {
      audioBtn.textContent = audioEnabled ? '🔊' : '🔇';
      audioBtn.addEventListener('click', () => {
        audioEnabled = !audioEnabled;
        safeStorage.setItem('amy-audio-enabled', audioEnabled);
        audioBtn.textContent = audioEnabled ? '🔊' : '🔇';
        initAudio();
        if (!audioEnabled) {
          stopAmbient();
        }
      });
    }

    let ambientOsc = null;
    let ambientGain = null;
    let chimeInterval = null;

    function stopAmbient() {
      if (ambientOsc) {
        try { ambientOsc.stop(); } catch(e) {}
        ambientOsc = null;
      }
      if (ambientGain) {
        try {
          ambientGain.gain.setValueAtTime(ambientGain.gain.value, audioCtx ? audioCtx.currentTime : 0);
          ambientGain.gain.linearRampToValueAtTime(0, (audioCtx ? audioCtx.currentTime : 0) + 0.3);
        } catch(e) {}
      }
      if (chimeInterval) {
        clearInterval(chimeInterval);
        chimeInterval = null;
      }
    }

    function playAgentAmbient(agent) {
      initAudio();
      if (!audioCtx || audioCtx.state === 'suspended') return;
      if (!audioEnabled) return;

      stopAmbient();

      ambientGain = audioCtx.createGain();
      ambientGain.gain.setValueAtTime(0, audioCtx.currentTime);
      ambientGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.25);
      ambientGain.connect(audioCtx.destination);

      if (agent === 'sage') {
        // Sage: Campanillas cristalinas y sintetizador de fondo suave
        ambientOsc = audioCtx.createOscillator();
        ambientOsc.type = 'triangle';
        ambientOsc.frequency.setValueAtTime(220, audioCtx.currentTime);
        
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1000, audioCtx.currentTime);
        filter.Q.setValueAtTime(1, audioCtx.currentTime);
        
        ambientOsc.connect(filter);
        filter.connect(ambientGain);
        ambientOsc.start();
        
        chimeInterval = setInterval(() => {
          if (!audioCtx || !audioEnabled) return;
          const chimeOsc = audioCtx.createOscillator();
          const chimeGain = audioCtx.createGain();
          chimeOsc.type = 'sine';
          chimeOsc.frequency.setValueAtTime(1000 + Math.random() * 800, audioCtx.currentTime);
          chimeGain.gain.setValueAtTime(0, audioCtx.currentTime);
          chimeGain.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 0.1);
          chimeGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
          
          chimeOsc.connect(chimeGain);
          chimeGain.connect(audioCtx.destination);
          chimeOsc.start();
          chimeOsc.stop(audioCtx.currentTime + 1.3);
        }, 2200);

      } else if (agent === 'gekko') {
        // Gekko: Sintetizador burbujeante digital
        ambientOsc = audioCtx.createOscillator();
        ambientOsc.type = 'sine';
        ambientOsc.frequency.setValueAtTime(180, audioCtx.currentTime);
        
        const lfo = audioCtx.createOscillator();
        const lfoGain = audioCtx.createGain();
        lfo.frequency.value = 6;
        lfoGain.gain.value = 15;
        
        lfo.connect(lfoGain);
        lfoGain.connect(ambientOsc.frequency);
        
        ambientOsc.connect(ambientGain);
        lfo.start();
        ambientOsc.start();

      } else if (agent === 'brimstone') {
        // Brimstone: Zumbido mecánico de radar
        ambientOsc = audioCtx.createOscillator();
        ambientOsc.type = 'sawtooth';
        ambientOsc.frequency.setValueAtTime(75, audioCtx.currentTime);
        
        const lowpass = audioCtx.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.setValueAtTime(120, audioCtx.currentTime);
        
        ambientOsc.connect(lowpass);
        lowpass.connect(ambientGain);
        ambientOsc.start();
        
        chimeInterval = setInterval(() => {
          if (!audioCtx || !audioEnabled) return;
          const sonarOsc = audioCtx.createOscillator();
          const sonarGain = audioCtx.createGain();
          sonarOsc.type = 'sine';
          sonarOsc.frequency.setValueAtTime(880, audioCtx.currentTime);
          sonarGain.gain.setValueAtTime(0.02, audioCtx.currentTime);
          sonarGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);
          
          sonarOsc.connect(sonarGain);
          sonarGain.connect(audioCtx.destination);
          sonarOsc.start();
          sonarOsc.stop(audioCtx.currentTime + 1.9);
        }, 3200);
      }
    }

    function playSynthSound(type) {
      initAudio();
      if (!audioCtx || audioCtx.state === 'suspended') return;
      if (!audioEnabled) return;

      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      if (type === 'hit') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.12);
        gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.12);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
      } else if (type === 'miss') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(90, audioCtx.currentTime + 0.15);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      }
    }

    modeBtn.addEventListener('click', () => {
      document.body.classList.toggle('comp-mode');
      const isComp = document.body.classList.contains('comp-mode');
      safeStorage.setItem('amy-comp-mode', isComp);
      modeBtn.textContent = isComp ? '🛡️' : '🖤';
      if (!selectedAgentColor) {
        setAccentColor(getDefaultAccentColor());
      }
    });

    // Scroll progress
    const scrollBar = document.getElementById('scrollBar');
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      if (scrollBar) {
        scrollBar.style.width = scrolled + '%';
      }
    }, { passive: true });

    // Barra de navegación con indicador HUD autodesplazable
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.createElement('div');
    navIndicator.className = 'nav-indicator';
    if (navMenu) {
      navMenu.appendChild(navIndicator);
    }

    function updateNavIndicator(activeLink) {
      if (activeLink && navMenu) {
        const rect = activeLink.getBoundingClientRect();
        const parentRect = navMenu.getBoundingClientRect();
        navIndicator.style.left = (rect.left - parentRect.left) + 'px';
        navIndicator.style.width = rect.width + 'px';
        navIndicator.style.opacity = '1';
      } else {
        navIndicator.style.opacity = '0';
      }
    }

    window.addEventListener('resize', () => {
      const activeLink = document.querySelector('.nav-link.active');
      if (activeLink) {
        updateNavIndicator(activeLink);
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        updateNavIndicator(link);
      });
    });

    const sections = document.querySelectorAll('section, header');
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
              updateNavIndicator(link);
            } else {
              link.classList.remove('active');
            }
          });
          if (entry.target.tagName === 'HEADER') {
            updateNavIndicator(null);
          }
        }
      });
    }, { threshold: 0.3, rootMargin: '-15% 0px -45% 0px' });
    sections.forEach(sec => navObserver.observe(sec));

    // Filtros gear
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gearItems = document.querySelectorAll('.gear-item');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        gearItems.forEach(item => {
          const category = item.getAttribute('data-category');
          item.classList.toggle('hidden', filter !== 'all' && category !== filter);
        });
      });
    });

    // Selector de agente (color, fondo dinámico, rotación 3D y sonido ambiental)
    let hoverAgentColor = null;
    const agentCards = document.querySelectorAll('.game-card');
    agentCards.forEach(card => {
      const agent = card.getAttribute('data-agent');
      
      // Rotación 3D Dinámica (sutil y elegante)
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const rotateX = -(y - yc) / 40;
        const rotateY = (x - xc) / 40;
        
        requestAnimationFrame(() => {
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        });
      });

      card.addEventListener('mouseenter', () => {
        if (agent && agentColors[agent]) {
          hoverAgentColor = agentColors[agent];
          setAccentColor(hoverAgentColor);
          if (agentBgImages[agent]) {
            agentBgOverlay.style.backgroundImage = `url('${agentBgImages[agent]}')`;
            agentBgOverlay.classList.add('active');
          }
        }
      });

      card.addEventListener('mouseleave', () => {
        hoverAgentColor = null;
        restoreAccentColor();
        restoreAgentBg();
        requestAnimationFrame(() => {
          card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
      });

      card.addEventListener('click', (e) => {
        e.stopPropagation();
        if (agent && agentColors[agent]) {
          selectedAgent = agent;
          selectedAgentColor = agentColors[agent];
          setAccentColor(selectedAgentColor);
          if (agentBgImages[agent]) {
            agentBgOverlay.style.backgroundImage = `url('${agentBgImages[agent]}')`;
            agentBgOverlay.classList.add('active');
          }
        }
      });
    });

    document.body.addEventListener('click', (e) => {
      if (!e.target.closest('.game-card')) {
        selectedAgent = null;
        selectedAgentColor = null;
        restoreAccentColor();
        restoreAgentBg();
      }
    });

    // Datos de habilidades para los agentes
    const abilitiesData = {
      sage: {
        C: { name: "Orbe de Barrera (Control)", desc: "Uso el muro principalmente para asegurar el site" },
        Q: { name: "Orbe de Ralentización (Q)", desc: "Perfecto para relentizar o detener ejecuciones enemigas rápidas" },
        E: { name: "Orbe de Curación (E)", desc: "Lo utilizo para curar a mi equipo o a mi misma" },
        X: { name: "Resurrección (X)", desc: "Busco revivir a compañeros" }
      },
      gekko: {
        C: { name: "Mosh Pit (Control)", desc: "Granada de gran daño. La uso para denegar el defuse post-plant o limpiar esquinas cerradas." },
        Q: { name: "Wingman (Q)", desc: "¡El main de Gekko! Plantar o defusar a distancia mientras cubro otros ángulos es clave." },
        E: { name: "Dizzy (E)", desc: "Flash de información. Si Dizzy dispara su pintura azul, ya sé la posición exacta del enemigo." },
        X: { name: "Thrash (X)", desc: "La definitiva. Permite limpiar el site entero y retener a los enemigos para un push fácil." }
      },
      brimstone: {
        C: { name: "Baliza de Estimulante (Control)", desc: "Aumenta la cadencia. La tiro justo antes de entrar a un site para dar ventaja en los duelos." },
        Q: { name: "Incendiario (Q)", desc: "Molly clásica. Esencial para denegar plantados o tapar cuellos de botella." },
        E: { name: "Humo del Cielo (E)", desc: "Tres humos de larga duración. Bloqueo visual instantáneo para ejecutar entradas limpias." },
        X: { name: "Golpe Orbital (X)", desc: "Limpio posiciones comunes de defensa o aseguro la ronda denegando el defuse." }
      }
    };

    // Habilidades de agentes (Pestañas Interactivas)
    const abilityButtons = document.querySelectorAll('.ability-tab');
    abilityButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar seleccionar la tarjeta al hacer clic en las habilidades
        const card = btn.closest('.game-card');
        const agent = card.getAttribute('data-agent');
        const key = btn.getAttribute('data-ability');
        
        // Desactivar otros botones de esta tarjeta
        const siblings = card.querySelectorAll('.ability-tab');
        siblings.forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        
        // Actualizar textos dinámicos
        const nameEl = card.querySelector('.ability-name');
        const descEl = card.querySelector('.ability-desc');
        if (abilitiesData[agent] && abilitiesData[agent][key]) {
          nameEl.textContent = abilitiesData[agent][key].name;
          descEl.textContent = abilitiesData[agent][key].desc;
        }
      });
    });

    // Cursor glow y Linterna táctica (Unificado y Optimizado con rAF)
    const flashlight = document.createElement('div');
    flashlight.className = 'tactical-flashlight';
    document.body.appendChild(flashlight);

    let mouseMoveRequest;
    let mouseX = 0;
    let mouseY = 0;

    function updateMousePositions() {
      document.body.style.setProperty('--mouse-x', mouseX + 'px');
      document.body.style.setProperty('--mouse-y', mouseY + 'px');
      flashlight.style.left = mouseX + 'px';
      flashlight.style.top = mouseY + 'px';
      mouseMoveRequest = null;
    }

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!mouseMoveRequest) {
        mouseMoveRequest = requestAnimationFrame(updateMousePositions);
      }
    });

    // Desafío de Puntería (Aim Trainer Game)
    const canvas = document.getElementById('sensCanvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      
      // Elementos del DOM
      const startAimBtn = document.getElementById('startAimBtn');
      const aimStats = document.getElementById('aimStats');
      const aimScoreVal = document.getElementById('aimScore');
      const aimAccuracyVal = document.getElementById('aimAccuracy');
      const aimTimeVal = document.getElementById('aimTime');

      // Estado del juego
      let posX = canvas.width / 2;
      let posY = canvas.height / 2;

      let isPlaying = false;
      let hits = 0;
      let totalClicks = 0;
      let timeLeft = 10;
      let gameInterval = null;
      let targetX = 0;
      let targetY = 0;
      const targetRadius = 14;

      let particles = [];
      let floatingTexts = [];
      let animFrameId = null;

      // Lógica de juego
      function spawnTarget() {
        const margin = 30;
        targetX = margin + Math.random() * (canvas.width - margin * 2);
        targetY = margin + Math.random() * (canvas.height - margin * 2);
      }

      function updateStats() {
        aimScoreVal.textContent = hits;
        const accuracy = totalClicks > 0 ? Math.round((hits / totalClicks) * 100) : 100;
        aimAccuracyVal.textContent = accuracy + "%";
        aimTimeVal.textContent = timeLeft + "s";
      }

      function createExplosion(x, y, color) {
        for (let i = 0; i < 12; i++) {
          particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2.5,
            vy: (Math.random() - 0.5) * 2.5,
            radius: Math.random() * 2.5 + 1.5,
            alpha: 1,
            decay: Math.random() * 0.015 + 0.008,
            color: color
          });
        }
      }

      function spawnFloatingText(x, y, text, color) {
        floatingTexts.push({
          x: x,
          y: y,
          vy: -0.6,
          alpha: 1,
          text: text,
          color: color
        });
      }

      function gameLoop() {
        if (isPlaying || particles.length > 0 || floatingTexts.length > 0) {
          draw();
          animFrameId = requestAnimationFrame(gameLoop);
        } else {
          animFrameId = null;
        }
      }

      function triggerAnimation() {
        if (!animFrameId) {
          gameLoop();
        }
      }

      function startGame() {
        isPlaying = true;
        hits = 0;
        totalClicks = 0;
        timeLeft = 10;
        aimStats.style.visibility = 'visible';
        spawnTarget();
        updateStats();
        startAimBtn.textContent = "Detener Juego ⏹️";
        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(() => {
          timeLeft--;
          if (timeLeft <= 0) {
            endGame();
          } else {
            updateStats();
          }
        }, 1000);
        triggerAnimation();
      }

      function endGame() {
        isPlaying = false;
        if (gameInterval) {
          clearInterval(gameInterval);
          gameInterval = null;
        }
        startAimBtn.textContent = "Iniciar Juego 🎯";
        aimStats.style.visibility = 'hidden';
        setTimeout(() => {
          if (!animFrameId) draw();
        }, 200);
      }

      function shoot() {
        if (!isPlaying) return;
        totalClicks++;
        const dist = Math.hypot(posX - targetX, posY - targetY);
        const accentColor = getAccent();
        if (dist <= targetRadius + 8) {
          hits++;
          playSynthSound('hit');
          createExplosion(targetX, targetY, accentColor);
          spawnFloatingText(targetX, targetY - 20, "+1", "#ffffff");
          spawnTarget();
        } else {
          playSynthSound('miss');
          spawnFloatingText(posX, posY - 20, "MISS", "#ff4655");
        }
        updateStats();
        triggerAnimation();
      }

      startAimBtn.addEventListener('click', () => {
        startAimBtn.blur();
        if (isPlaying) {
          endGame();
        } else {
          startGame();
        }
      });

      canvas.addEventListener('click', () => {
        if (isPlaying) {
          shoot();
        }
      });

      // Renderizado
      let cachedAccent = '';
      let accentCacheTime = 0;
      function getAccent() {
        const now = performance.now();
        if (now - accentCacheTime > 200) {
          cachedAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
          accentCacheTime = now;
        }
        return cachedAccent;
      }

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const accent = getAccent();
        
        if (isPlaying) {
          // Dibujar diana (target)
          ctx.fillStyle = accent + '33'; // Brillo exterior translúcido
          ctx.strokeStyle = accent;
          ctx.lineWidth = 2;
          
          ctx.beginPath();
          ctx.arc(targetX, targetY, targetRadius + 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(targetX, targetY, targetRadius - 4, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(targetX, targetY, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Dibujar y actualizar partículas
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;
          if (p.alpha <= 0) {
            particles.splice(i, 1);
          } else {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }

        // Dibujar y actualizar textos flotantes
        for (let i = floatingTexts.length - 1; i >= 0; i--) {
          const ft = floatingTexts[i];
          ft.y += ft.vy;
          ft.alpha -= 0.01;
          if (ft.alpha <= 0) {
            floatingTexts.splice(i, 1);
          } else {
            ctx.save();
            ctx.globalAlpha = ft.alpha;
            ctx.fillStyle = ft.color;
            ctx.font = 'bold 12px monospace';
            ctx.fillText(ft.text, ft.x, ft.y);
            ctx.restore();
          }
        }
        
        // Dibujar retícula (crosshair)
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        
        ctx.beginPath();
        ctx.arc(posX, posY, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(posX, posY, 8, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(posX - 12, posY); ctx.lineTo(posX - 5, posY);
        ctx.moveTo(posX + 5, posY);  ctx.lineTo(posX + 12, posY);
        ctx.moveTo(posX, posY - 12); ctx.lineTo(posX, posY - 5);
        ctx.moveTo(posX, posY + 5);  ctx.lineTo(posX, posY + 12);
        ctx.stroke();
        
        // Textos del canvas
        if (isPlaying) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.font = '10px monospace';
          ctx.fillText(`Tiempo: ${timeLeft}s`, 10, 20);
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.font = '12px monospace';
          ctx.fillText("Aim Game: Apunta y dispara", 10, 20);
          
          if (totalClicks > 0) {
            ctx.fillStyle = accent;
            ctx.font = 'bold 16px Rajdhani, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText("¡DESAFÍO COMPLETADO!", canvas.width / 2, canvas.height / 2 - 10);
            ctx.fillStyle = '#ffffff';
            ctx.font = '13px monospace';
            const acc = Math.round((hits / totalClicks) * 100);
            ctx.fillText(`Dianas: ${hits} | Prec: ${acc}%`, canvas.width / 2, canvas.height / 2 + 15);
            ctx.textAlign = 'left';
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText("Mueve tu ratón aquí para jugar", canvas.width / 2, canvas.height / 2);
            ctx.textAlign = 'left';
          }
        }
      }

      // Eventos del ratón/táctiles (Movimiento 1:1 directo)
      canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        posX = (e.clientX - rect.left) * scaleX;
        posY = (e.clientY - rect.top) * scaleY;
        if (!animFrameId) {
          draw();
        }
      });

      canvas.addEventListener('touchstart', (e) => {
        if(e.touches.length > 0) {
          const rect = canvas.getBoundingClientRect();
          posX = (e.touches[0].clientX - rect.left) * (canvas.width / rect.width);
          posY = (e.touches[0].clientY - rect.top) * (canvas.height / rect.height);
          if (!animFrameId) {
            draw();
          }
        }
      }, { passive: true });

      canvas.addEventListener('touchmove', (e) => {
        if(e.touches.length > 0) {
          e.preventDefault();
          const rect = canvas.getBoundingClientRect();
          posX = (e.touches[0].clientX - rect.left) * (canvas.width / rect.width);
          posY = (e.touches[0].clientY - rect.top) * (canvas.height / rect.height);
          if (!animFrameId) {
            draw();
          }
        }
      }, { passive: false });


      draw();
    }

    // Intersection Observer
    const fadeElements = document.querySelectorAll('.fade-in-section');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      fadeElements.forEach(el => observer.observe(el));
    } else {
      fadeElements.forEach(el => el.classList.add('is-visible'));
    }

    restoreAccentColor();
  })();
