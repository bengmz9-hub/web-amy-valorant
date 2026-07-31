# AMY WEB PROJECT

Proyecto integral de AMY: jugadora de Valorant (ranked Platino 1-3, desde casa).

Dos frentes: la landing/portfolio (web) y el canal de YouTube (shorts de jugadas).

## Canales de AMY

- TikTok: https://www.tiktok.com/@amyjgil
- YouTube: https://www.youtube.com/@AmyJGil (channelId UCnHkFkIl3isFLVYI7maspeQ)

## Estructura (regla de oro: nada suelto en la raiz)

```
AMY WEB PROJECT/
├── landing-page/          <- TODO lo de la web/portfolio
│   ├── index.html         <- web principal (GitHub Pages)
│   ├── app.js / style.css
│   ├── assets/imagenes/   <- arte e imagenes (todas las rutas ya apuntan aqui)
│   ├── docs/
│   │   ├── concepto-landing.md   <- vision de la landing como hub
│   │   └── ideas/                 <- maquetas antiguas (idea1, idea2)
│   └── scripts/           <- utilidades (temp_check.js)
└── canal-youtube/         <- TODO lo del canal
    ├── 01-planning/       <- estrategia + calendario (leer primero)
    ├── 02-guiones/        <- ideas, titulos, guiones de shorts
    ├── 03-clips-brutos/   <- footage sin editar (ShadowPlay)
    ├── 04-edits-finales/  <- shorts terminados, listos para subir
    ├── 05-thumbnails/     <- portadas
    └── 06-analiticas/     <- metricas y screenshots
```

## Flujo de trabajo

1. Jugar y guardar clips (ShadowPlay) -> canal-youtube/03-clips-brutos/
2. Editar en CapCut -> exportar a canal-youtube/04-edits-finales/
3. Titulos/descripciones (banco de ideas en 02-guiones/) -> subir a YouTube
4. Screenshots de metricas -> canal-youtube/06-analiticas/

## Notas

- `.webui_secret_key` en la raiz es secreto de infraestructura, NO tocar ni subir.
- La landing se publica con subir.bat (git pull + push a GitHub Pages).
- Leer siempre canal-youtube/01-planning/plan-canal-youtube.md antes de producir contenido.
