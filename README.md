# AMY WEB PROJECT — React + Tailwind

Web de **AMY** — jugadora de Valorant (Platino 2, main Sage) y creadora de contenido.
Migrada de HTML estático a **React 19 + Vite 6 + Tailwind v4** (ago 2026).

## Estructura

```
AMY WEB PROJECT/
├── index.html              ← entrada Vite (meta, fonts, JSON-LD)
├── vite.config.js
├── package.json
├── public/                 ← estáticos: assets/imagenes, robots, sitemap, manifest
├── src/
│   ├── main.jsx            ← bootstrap React
│   ├── App.jsx             ← layout + efectos (initApp, mountStrands)
│   ├── index.css           ← Tailwind utilities + CSS heredado 1:1
│   ├── app.js              ← efectos JS heredados (cursor, audio, aim trainer, tabs…)
│   ├── strands.js          ← efecto reactbits Strands (OGL) portado a vanilla
│   └── components/         ← Navbar, Hero, Stats, Agents, SetupGear, AmyShow, Footer
├── .github/workflows/pages.yml  ← build + deploy GitHub Pages (dist/)
└── ver-local.bat           ← npm run dev en :5173
```

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Dev server en http://localhost:5173/ |
| `npm run build` | Build de producción → `dist/` |
| `npm run preview` | Sirve el build local |

## Deploy

GitHub Pages vía Actions (`.github/workflows/pages.yml`): `npm ci && npm run build` → publica `dist/`.
La versión estática anterior está archivada en el tag git `v1-static`.
Canal YouTube (contenido, no web) movido a `C:\Users\rgs84\canal-youtube\`.
