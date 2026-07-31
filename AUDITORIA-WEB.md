# AUDITORÍA WEB AMY — landing-page

Fecha: 31/07/2026
Método: 4 agentes locales vía Ollama (qwen2.5-coder:14b → app.js y style.css; gemma4:12b-it-qat → index.html; deepseek-r1:14b → análisis de duplicación) + verificación manual de cada hallazgo (grep cruzado, node --check, comprobación HTTP del sitio publicado).
Alcance: landing-page/ del repo web-amy-valorant (GitHub Pages: https://bengmz9-hub.github.io/web-amy-valorant/).
Regla aplicada: auditoría de solo lectura — NO se ha modificado código.

---

## RESUMEN EJECUTIVO

| Severidad | Cantidad |
|-----------|----------|
| CRÍTICO   | 2        |
| ALTO      | 1        |
| MEDIO     | 4        |
| BAJO      | 5        |

Los 2 críticos son urgentes:
1. Secreto de infraestructura publicado en GitHub (`.webui_secret_key`, valor visible públicamente).
2. El deploy publicado NO corresponde al código del repo (refactor sin subir) — la web que ve el público es una versión antigua con rutas distintas, y las URLs de redes sociales apuntan a rutas que dejarán de existir.

---

## CRÍTICOS

### C1. Secreto filtrado a GitHub — `.webui_secret_key`
- Archivo: raíz del repo (trackeado en git, commit inicial).
- Evidencia: `https://raw.githubusercontent.com/bengmz9-hub/web-amy-valorant/main/.webui_secret_key` → HTTP 200 con contenido `[REDACTADO]`.
- El propio README.md dice: ".webui_secret_key en la raiz es secreto de infraestructura, NO tocar ni subir".
- Causa raíz: no existe `.gitignore` en el repo y `subir.bat` hace `git add .` incondicional → cualquier archivo suelto se sube.
- Fix:
  1. ROTAR el secreto (generar uno nuevo en la herramienta que lo use; el valor publicado debe darse por comprometido).
  2. `git rm --cached .webui_secret_key`
  3. Crear `.gitignore` con `.webui_secret_key`, `.audit/`, `public_home.html`, `*.log`.
  4. Revisar `git log` — el archivo seguirá en el historial; si el repo es público, purgar historial (filter-repo) o asumir el secreto como quemado (opción recomendada: rotar y no tocar historial).
  5. Endurecer `subir.bat`: `git add -u` o `git add .` + verificación de que no haya archivos ignorables (mejor: `git add --all` con `git status --porcelain` previo y abortar si aparece `.webui_secret_key`).

### C2. Deploy desactualizado + URLs sociales apuntando a rutas que van a romperse
- El repo local está en `a18b8fe` (refactor: imágenes movidas a `landing-page/assets/imagenes/`), pero `origin/main` está en `244f451` (versión vieja). El refactor NO se ha subido.
- Estado actual del sitio publicado: `amy_art.webp` → HTTP 200 (raíz), `assets/imagenes/amy_art.webp` → HTTP 404. Es decir: el público sigue viendo la versión antigua y las imágenes nuevas ni existen en producción.
- `og:image`, `og:image:secure_url`, `twitter:image` y el JSON-LD `Person.image` apuntan a `https://bengmz9-hub.github.io/web-amy-valorant/amy_art.webp` (raíz). Hoy devuelven 200 SOLO porque el deploy viejo tiene la imagen en la raíz. En cuanto se suba el refactor (subir.bat), esas URLs darán 404 y las vistas previas de redes sociales (Discord/WhatsApp/Twitter) se romperán.
- Fix:
  1. Actualizar a `https://bengmz9-hub.github.io/web-amy-valorant/assets/imagenes/amy_art.webp` en: líneas 22, 23, 31 del index.html y línea 53 del JSON-LD.
  2. Subir el refactor (git push) para sincronizar el sitio con el repo.
  3. Después del push, verificar con curl que la imagen responde 200 en la nueva ruta.

---

## ALTOS

### A1. `background-attachment: fixed` + blur permanente en fondos (rendimiento móvil)
- style.css línea 86 (`.global-bg`: `background-attachment: fixed`) y línea 99 (`.agent-bg-overlay`: `filter: blur(25px)` siempre activo, aunque `opacity: 0`).
- `background-attachment: fixed` es notoriamente lento en móvil/iOS (repintado completo en scroll) y Chrome lo desactiva en Android. El blur de 25px sobre una imagen de cover se rasteriza en cada frame aunque el overlay esté invisible.
- Fix: quitar `background-attachment: fixed` (o usar un pseudo-elemento fixed con `transform` para el parallax); en `.agent-bg-overlay` aplicar `visibility: hidden` cuando no esté `.active` (además del opacity) para que el navegador no rasterice el blur.

---

## MEDIOS

### M1. Código muerto: `landing-page/scripts/temp_check.js` (804 líneas, 28 KB)
- Es una versión ANTERIOR de `app.js` (difiere en: modo competitivo persistente vía localStorage, IIFE anidada, sin lazy-load de TikTok, gestión de audio menos robusta).
- Cero referencias: grep de `temp_check` en index.html, app.js y docs → 0 coincidencias. No se carga desde ningún sitio.
- Confirmado por agente deepseek-r1: "BORRAR temp_check.js. Riesgo bajo".
- Fix: borrar el archivo (y la carpeta scripts/ si no va a contener nada más). Si se quiere conservar como referencia histórica, moverlo a `docs/` — pero no debe vivir en landing-page/.

### M2. Variable muerta en app.js: `hoverAgentColor`
- Líneas 339, 361, 372: se asigna y se resetea a null, pero su valor solo se usa en la línea 362 (inmediatamente después de asignarla). La variable es redundante: `setAccentColor(hoverAgentColor)` equivale a `setAccentColor(agentColors[agent])`.
- Fix: eliminar la declaración y usar `agentColors[agent]` directamente en el handler de mouseenter.

### M3. `subir.bat` no es seguro ni informativo
- `git add .` (arrastra secretos, ver C1), mensaje de commit genérico ("Actualizacion automatica desde IA"), y si `git pull` falla por conflictos el script continúa igualmente (no hay `set -e`/`|| exit`).
- Fix: ver C1 punto 5; añadir chequeo de estado tras pull; usar mensajes de commit descriptivos o parametrizados.

### M4. Accesibilidad: botón de audio sin estado ARIA dinámico
- index.html línea 141: `aria-label="Activar/desactivar audio"` fijo, pero el JS (app.js líneas 89-100) cambia el icono 🔇/🔊 sin actualizar el atributo. Un lector de pantalla no sabe si el audio está activo.
- Fix: en el handler del click, hacer `audioBtn.setAttribute('aria-label', audioEnabled ? 'Desactivar audio' : 'Activar audio')` y `aria-pressed`.

---

## BAJOS

### B1. Clases HTML sin definición CSS
- `.setup-gear`, `.shorts-section`, `.site-header` aparecen en el HTML pero no tienen reglas propias en style.css (solo actúan como contenedores/hooks de JS). No rompe nada, pero si se esperaba estilo propio, falta.
- Fix: o eliminar las clases sobrantes o añadir las reglas (p. ej. padding coherente en `.shorts-section`).

### B2. `alt=""` en imágenes laterales sin `aria-hidden`
- index.html líneas 118-119: los dos `<img class="side-agent">` con `alt=""` son decorativos (y con fallback de ocultación por onerror). Correcto para decorativas, pero conviene añadir `aria-hidden="true"` explícito y `role="presentation"` para que ningún lector de pantalla las considere.

### B3. `start_url: "/"` en site.webmanifest
- El sitio vive bajo `/web-amy-valorant/` en GitHub Pages; `start_url: "/"` apuntaría a la raíz del dominio (bengmz9-hub.github.io), no a la app. Al instalarse como PWA abriría la página equivocada.
- Fix: `"start_url": "./"` (relativo) o la URL completa.

### B4. JSON-LD VideoObject incompleto
- Líneas 84-90: falta `thumbnailUrl` y `author`; el `contentUrl` apunta a TikTok (correcto, es donde vive el clip), pero sin thumbnail el rich result de Google puede no generarse.
- Fix: añadir `thumbnailUrl` apuntando a una imagen real del clip y `"author": {"@id": ".../#amy"}`.

### B5. sitemap.xml desactualizado
- `lastmod` = 2026-06-22 (más de un mes). El sitemap solo contiene la home (correcto para una one-page), pero el lastmod debería reflejar el último deploy real.
- Fix: actualizar `lastmod` al último push o dejar el campo fuera (Google lo ignora si es inconsistente).

---

## VERIFICACIONES QUE SALIERON LIMPIAS (no hay problema)

- Sintaxis JS: `node --check` OK en app.js y temp_check.js.
- Todos los `getElementById` de app.js existen en el HTML (aimScore, aimAccuracy, aimTime, sensCanvas, startAimBtn, modeBtn, audioBtn, scrollBar, shorts).
- Cero `console.log` / `console.warn` / `console.error` en producción.
- Cero TODO/FIXME/HACK.
- Sin fetch/XMLHttpRequest (web 100% estática, sin llamadas de red propias).
- Los selectores CSS `.nav-indicator` y `.tactical-flashlight` SÍ se usan (se crean dinámicamente por JS) — no son código muerto.
- Los supuestos "selectores muertos" reportados por el agente CSS (`.cursor-glow`, `.filter-btn.active`, `data-agent="sage"`, etc.) son falsos positivos: existen en el HTML. Se descartan.
- Los avisos del agente HTML sobre "fecha futura" (uploadDate 2025-10-01) y "© 2026" son incorrectos: hoy es julio 2026, esas fechas son válidas. Se descartan.
- `robots.txt` y `sitemap.xml` coherentes con la URL real del sitio.

---

## PLAN DE ACCIÓN RECOMENDADO (en orden)

1. Rotar el secreto `.webui_secret_key` + `git rm --cached` + crear `.gitignore` (C1).
2. Corregir las 4 URLs absolutas de imagen en index.html (og:image x2, twitter:image, JSON-LD) → `assets/imagenes/amy_art.webp` (C2).
3. Subir el refactor a origin/main y verificar con curl que `assets/imagenes/*` dan 200 y la raíz ya no tiene imágenes viejas (C2).
4. Borrar `landing-page/scripts/temp_check.js` (M1).
5. Eliminar `hoverAgentColor` de app.js (M2).
6. Quitar `background-attachment: fixed` y optimizar el blur del overlay (A1).
7. Endurecer `subir.bat` (M3) y añadir estado ARIA al botón de audio (M4).
8. Menores: B1-B5 (clases huérfanas, aria-hidden, start_url del manifest, thumbnail del VideoObject, lastmod del sitemap).

---

## APÉNDICE B — CORRECCIONES APLICADAS (01/08/2026)

Todas las correcciones de privacidad/keys solicitadas se aplicaron y verificaron:

| # | Corrección | Estado |
|---|-----------|--------|
| C1 | `.webui_secret_key` fuera del índice git (`git rm --cached`) y del repo público (raw → 404) | ✅ Verificado |
| C1 | `.gitignore` creado en la raíz (`.webui_secret_key`, `.audit/`, `public_home.html`, `*.log`, `local_agent.py`) | ✅ Verificado (`git check-ignore` activo) |
| C1 | `subir.bat` endurecido: aborta con `exit /b 1` si `.webui_secret_key`, `.audit` o `public_home` aparecen en staging | ✅ Verificado |
| C1 | Valor del secreto redactado en AUDITORIA-WEB.md (0 ocurrencias del literal) | ✅ Verificado |
| C2 | og:image / og:image:secure_url / twitter:image / JSON-LD image → `assets/imagenes/amy_art.webp` | ✅ Verificado (HTTP 200) |
| C2 | Deploy sincronizado: refactor subido + Pages reconfigurado a GitHub Actions (workflow `.github/workflows/pages.yml` publica `landing-page/`) | ✅ Verificado (landing sirviéndose con título correcto) |
| Nuevo | Deploy roto por el refactor (Pages servía `/`, web en `landing-page/`) — resuelto con Actions ya que Pages solo acepta `/` o `/docs` como source | ✅ Verificado |

Nota importante que quedó pendiente de decisión del usuario:

- ⚠️ **El valor del secreto sigue en el HISTORIAL de git** (commits `6e8dbb2` y `f201f76`). Ya no está en el working tree ni en la rama actual, pero cualquiera con acceso al repo puede verlo navegando el historial (UI de GitHub o `git log -p`). Para eliminarlo del todo haría falta purgar historial (`git filter-repo` + force push), lo cual reescribe los SHAs del repo. **RECOMENDACIÓN: rotar el secreto** (generar uno nuevo en la herramienta que lo usa — es secreto de infraestructura WebUI) y dar el valor publicado por comprometido. La purga de historial es opcional y debe decidirla el usuario.

---

## APÉNDICE C — SEGUNDA RONDA DE PRUEBAS (01/08/2026)

Pruebas adicionales realizadas tras la corrección de privacidad: Lighthouse, validación W3C, headers de seguridad, enlaces externos y auditoría integral delegada al MoE local (Qwen3.6-35B-A3B, 73s).

### C3. Lighthouse (Chrome headless, categorías perf/access/bp/seo)

| Categoría | Score |
|-----------|-------|
| Performance | 63 |
| Accesibilidad | 98 |
| Best Practices | 100 |
| SEO | 100 |

Métricas clave:
- FCP 3.1s · LCP 9.9s (crítico) · Speed Index 3.1s · TBT 0ms · CLS 0.137 · TTI 10.0s
- Ahorro estimado en imágenes: 1.374 KiB

### C4. Hallazgos verificados (MoE + confirmación con código/Lighthouse)

1. [CRÍTICO] LCP 9.9s: hero `amy_art.webp` (600×710, ~137KB) renderizada a 300px en desktop / 220px móvil. Fix: `srcset` con versión ~400px (ahorro ~300KB) + preload ya presente pero inútil a ese tamaño.
2. [ALTO] FCP 3.1s: 3 familias de fuentes (Cinzel, Rajdhani, Inter) render-blocking vía Google Fonts. Fix: cargar Inter crítica, resto con `media="print" onload` (o `display=swap` ya está).
3. [ALTO] `.global-bg` con `background-attachment: fixed` + `valorant_art.webp` (~79KB) se descarga siempre (fondo CSS, sin lazy). Fix: `background-attachment: scroll` en móvil o `<img>` lazy fija.
4. [MEDIO] CLS 0.137: causa real = `::before` del hero (832×832, animación `pulse` infinita) según Lighthouse, NO los embeds TikTok. Fix: quitar animación del pseudo-elemento o reservar layout.
5. [MEDIO] BFCache bloqueado: causa real = iframes de TikTok con unload handler (Lighthouse lo confirma con URLs de los 3 embeds). Fix: cargar embeds solo bajo interacción o aceptar (es el coste de TikTok embeds).
6. [MEDIO] Bug modo competitivo: si un agente está seleccionado, `modeBtn` no aplica el rojo competitivo (app.js líneas 244-253: `if (!selectedAgentColor)`). Fix: resetear `selectedAgentColor` al alternar modo.
7. [BAJO] `touchmove` del canvas con `preventDefault` no pasivo (app.js 778-788): puede bloquear scroll en móvil si el dedo cae en el canvas. Fix: `passive: false` solo al jugar.
8. [BAJO] Accesibilidad: headings no descendentes (h2 → h4 en footer, salta h3) — detectado por W3C y Lighthouse. Fix: h4 del footer → h3.

Falsos positivos del MoE (descartados tras verificación):
- "Audio leak" en chimeInterval: FALSO — `stopAmbient()` sí hace `clearInterval(chimeInterval)` (app.js 117-120).
- Causa del CLS atribuida a TikTok wrappers: FALSO — la causa real es el `::before` del hero (dato Lighthouse).
- Causa del BFCache atribuida a audio/canvas: FALSO — la causa real son los iframes de TikTok (dato Lighthouse).

### C5. Validación W3C

- HTML: 0 errores, 1 aviso (jerarquía de encabezados, ver C4.8).
- Enlaces externos: todos 200 (TikTok, YouTube, Google Fonts). Los "404" de fonts.googleapis.com/media.valorant-api.com son los `preconnect` (no navegables, falsos positivos del crawler).

### C6. Headers de seguridad

- `Strict-Transport-Security` presente (max-age 31556952) ✓
- Ausentes: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy. GitHub Pages no permite fijar headers por repo (solo vía CDN delante). Riesgo bajo para landing estática sin formularios, pero si se añaden formularios o analytics, considerar Cloudflare en frente.

### C7. Pruebas aún pendientes (opcionales)

- Lighthouse en móvil (simulación 4G) — el score desktop no refleja el peor caso.
- Comparativa LCP antes/después de aplicar srcset (validar el fix).
- Revisión de contraste WCAG AA con axe-core (Lighthouse da 98, solo quedan los headings).
- WebPageTest con captura del filmstrip si se quiere ver el LCP visualmente.

---

## APÉNDICE D — FIXES DE RENDIMIENTO APLICADOS (01/08/2026)

Aplicados y verificados en producción (commit `670986a`). Nada se rompió: W3C 0 errores/avisos, node --check OK, deploy Actions exitoso.

| Fix | Detalle |
|-----|---------|
| srcset hero | `amy_art_400.{webp,avif}` (400×363, 10KB vs 134KB original 1315×1196). El HTML declaraba 600×710 pero la imagen real era 1315×1196 — corregido width/height reales. |
| srcset agentes | `sage/gekko/brimstone_art_400.{webp,avif}` (12-18KB vs 31-58KB). |
| Fuentes | Google Fonts con `preload as=style onload` + fallback `<noscript>` (no render-blocking). |
| Headings | Footer h4 → h3 (arregla aviso W3C + accesibilidad). |
| CLS hero | Animación `pulse` del `::before` del hero eliminada (causa del CLS 0.137). |
| Modo competitivo | Al alternar modo se resetea `selectedAgent/selectedAgentColor` → el rojo competitivo aplica siempre. |
| touchmove | `preventDefault` eliminado + `passive: true` (el canvas ya tiene `touch-action: none` en CSS). |

### Resultados Lighthouse (desktop, mismo entorno)

| Métrica | ANTES | DESPUÉS | Δ |
|---------|-------|---------|---|
| Performance | 63 | **73** | +10 |
| Accesibilidad | 98 | **100** | +2 |
| LCP | 9.9s | **4.8s** | -51% |
| CLS | 0.137 | **0** | perfecto |
| TTI | 10.0s | **4.9s** | -51% |
| FCP | 3.1s | 3.3s | ~igual |
| TBT | 0ms | 0ms | igual |

BFCache sigue bloqueado (causa: iframes de TikTok con unload handler — coste inherente de los embeds, no fixable sin cambiarlos).

### Lighthouse móvil (390×844, 4G simulado, CPU×4) — peor caso

- Performance 65, Accesibilidad 100
- LCP 10.0s (score 0) — dominado por la red simulada y el CSS/JS; el siguiente paso sería reducir JS (app.js 28KB + TikTok embed.js) o mover el aim trainer a carga diferida
- CLS 0.107 — ahora viene de los embeds TikTok que cargan tarde en móvil (el hero ya no contribuye)
- TBT 0ms, Speed Index 3.3s

Nota: el móvil 4G es el peor caso artificial (CPU throttled ×4 + 1638 Kbps). El rendimiento real en un móvil moderno con WiFi es muy superior.

## APÉNDICE — artefactos de la auditoría

- Informes crudos de los agentes locales: `.audit/audit-appjs.md`, `.audit/audit-stylecss.md`, `.audit/audit-indexhtml.md`, `.audit/audit-duplicacion.md`, `.audit/audit-moe-integral.md`
- Lighthouse JSON: `/tmp/lh.json` (copiar a `.audit/` si se quiere conservar)
- Script de auditoría: `.audit/run_audit.py` (reutilizable)
- Copia del HTML publicado: `public_home.html` (en la raíz del proyecto, borrable)
- Nota: `.audit/` y `public_home.html` deben añadirse a `.gitignore` (o borrarse) para no subirlos.
