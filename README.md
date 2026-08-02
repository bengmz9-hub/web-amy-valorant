# AMY WEB PROJECT — React + Tailwind

Web for **AMY** — Valorant player (Platinum 2, Sage main) and content creator.
Migrated from static HTML to **React 19 + Vite 6 + Tailwind v4** (Aug 2026).

## Structure

```
AMY WEB PROJECT/
├── index.html              ← Vite entry (meta, fonts, JSON-LD)
├── vite.config.js
├── package.json
├── public/                 ← static assets, robots, sitemap, manifest
├── src/
│   ├── main.jsx            ← React bootstrap
│   ├── App.jsx             ← layout + effects (initApp, mountStrands)
│   ├── index.css           ← Tailwind utilities + 1:1 inherited CSS
│   ├── app.js              ← inherited JS effects (cursor, audio, aim trainer, tabs…)
│   ├── strands.js          ← reactbits Strands effect (OGL) ported to vanilla
│   └── components/         ← Navbar, Hero, Stats, Agents, SetupGear, AmyShow, Footer
├── .github/workflows/pages.yml  ← build + deploy GitHub Pages (dist/)
└── ver-local.bat           ← npm run dev on :5173
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server at http://localhost:5173/ |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the build locally |

## Deploy

GitHub Pages via Actions (`.github/workflows/pages.yml`): `npm ci && npm run build` → publishes `dist/`.
The previous static version is archived under git tag `v1-static`.
YouTube channel (content, not web) moved to `C:\Users\rgs84\canal-youtube\`.

## License

MIT
