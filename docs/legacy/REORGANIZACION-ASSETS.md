# Propuesta de reorganización de assets — landing-page

Fecha: 2026-08-01 · Estado: PROPUESTA (nada ejecutado)

## 1. Estado actual (inventario real)

```
landing-page/
├── index.html          ← 21 referencias a "assets/imagenes/"
├── robots.txt / sitemap.xml / site.webmanifest  ← webmanifest apunta a favicon
├── subir.bat
├── docs/
│   ├── concepto-landing.md
│   ├── propuestas-hero-agosto-2026.md
│   └── ideas/          ← carpeta VACÍA (basura)
└── assets/
    └── imagenes/       ← MEZCLA todo: imágenes, video, iconos, favicon
        ├── amy_art.webp / .avif / _400.webp / _400.avif      (hero portal)
        ├── sage_art.* / gekko_art.* / brimstone_art.*        (8 ficheros, cards agentes)
        ├── valorant_art.webp / .avif                         (fondo CSS)
        ├── sageAURA.webm          ← VIDEO dentro de "imagenes"
        ├── tiktok_art.svg         ← ICONO
        ├── youtube_art.svg        ← ICONO
        ├── favicon.svg            ← ICONO (favicon)
        ├── SAGE WALLPAPER.jpg     ← HUÉRFANO (0 referencias en index.html)
        └── pinterest-amy.png      ← HUÉRFANO (0 referencias en index.html)
```

Problemas detectados:
1. Un solo contenedor mezcla 4 tipos de asset (imagen, video, icono, favicon).
2. Nombre en español (`imagenes`) rompe la convención estándar (`images`).
3. 2 ficheros huérfanos (`SAGE WALLPAPER.jpg` 40KB, `pinterest-amy.png` 236KB) que nadie referencia.
4. `docs/ideas/` vacía.
5. `docs/concepto-landing.md` (líneas 22, 25, 29) documenta la ruta vieja → quedará obsoleta.

## 2. Estructura objetivo (estándar profesional, válida para estático y Next.js)

```
landing-page/
├── index.html
├── robots.txt / sitemap.xml / site.webmanifest / subir.bat
├── docs/                      (solo .md, sin ideas/)
└── assets/
    ├── images/
    │   ├── amy_art.webp / .avif / _400.webp / _400.avif      ← hero
    │   ├── sage_art.* / gekko_art.* / brimstone_art.*        ← agentes (8)
    │   ├── valorant_art.webp / .avif                         ← fondo CSS
    │   └── archive/
    │       ├── SAGE WALLPAPER.jpg                            ← huérfano (se conserva)
    │       └── pinterest-amy.png                             ← huérfano (se conserva)
    ├── videos/
    │   └── sageAURA.webm
    ├── icons/
    │   ├── tiktok_art.svg
    │   ├── youtube_art.svg
    │   └── favicon.svg
    └── fonts/                ← NO se crea ahora: las fuentes vienen de Google Fonts CDN.
                                 Se crearía solo si algún día se auto-alojan woff2.
```

Notas de diseño:
- `assets/fonts/` NO se crea hoy (Rajdhani/Inter/Cinzel vienen de fonts.googleapis.com, líneas 33-37). Si se auto-alojan en el futuro: descargar woff2 → `assets/fonts/` + `@font-face`.
- La profundidad de ruta NO cambia (`assets/imagenes/X` → `assets/images/X` = misma profundidad relativa), por eso las URLs relativas siguen resolviendo sin `../`.
- Migración futura a Next.js: `assets/` se copia tal cual a `public/` (public/ ES la raíz web) y se cambian los `<img>` por `next/image`. Tailwind no afecta a la organización de assets.
- Variante opcional (más granular, típica en React): `assets/images/hero/` y `assets/images/agents/`. El coste es el mismo (cada fichero se lista individualmente) pero añade segmentos de ruta. Se propone plana para minimizar diff; se puede refinar después.

## 3. Tabla de migración archivo por archivo

| # | Fichero actual | Tamaño | Tipo | Destino | ¿Tiene referencias? |
|---|---|---|---|---|---|
| 1 | amy_art.webp | 136K | imagen | assets/images/amy_art.webp | sí |
| 2 | amy_art.avif | 136K | imagen | assets/images/amy_art.avif | sí |
| 3 | amy_art_400.webp | 12K | imagen | assets/images/amy_art_400.webp | sí |
| 4 | amy_art_400.avif | 12K | imagen | assets/images/amy_art_400.avif | no (generada; se mueve por pareja) |
| 5 | sage_art.webp | 48K | imagen | assets/images/sage_art.webp | sí |
| 6 | sage_art.avif | 40K | imagen | assets/images/sage_art.avif | sí (CSS+JS) |
| 7 | sage_art_400.webp | 20K | imagen | assets/images/sage_art_400.webp | sí |
| 8 | sage_art_400.avif | 16K | imagen | assets/images/sage_art_400.avif | sí |
| 9 | gekko_art.webp | 60K | imagen | assets/images/gekko_art.webp | sí |
| 10 | gekko_art.avif | 52K | imagen | assets/images/gekko_art.avif | sí (JS) |
| 11 | gekko_art_400.webp | 20K | imagen | assets/images/gekko_art_400.webp | sí |
| 12 | gekko_art_400.avif | 16K | imagen | assets/images/gekko_art_400.avif | sí |
| 13 | brimstone_art.webp | 40K | imagen | assets/images/brimstone_art.webp | sí |
| 14 | brimstone_art.avif | 32K | imagen | assets/images/brimstone_art.avif | sí (JS) |
| 15 | brimstone_art_400.webp | 16K | imagen | assets/images/brimstone_art_400.webp | sí |
| 16 | brimstone_art_400.avif | 12K | imagen | assets/images/brimstone_art_400.avif | sí |
| 17 | valorant_art.webp | 80K | imagen | assets/images/valorant_art.webp | sí |
| 18 | valorant_art.avif | 88K | imagen | assets/images/valorant_art.avif | no (generada; se mueve por pareja) |
| 19 | sageAURA.webm | 1,1M | video | assets/videos/sageAURA.webm | sí |
| 20 | tiktok_art.svg | 4K | icono | assets/icons/tiktok_art.svg | sí |
| 21 | youtube_art.svg | 4K | icono | assets/icons/youtube_art.svg | sí |
| 22 | favicon.svg | 1K | icono | assets/icons/favicon.svg | sí (2 en HTML + webmanifest) |
| 23 | SAGE WALLPAPER.jpg | 40K | imagen | assets/images/archive/ | NO (huérfano, conservar) |
| 24 | pinterest-amy.png | 236K | imagen | assets/images/archive/ | NO (huérfano, conservar) |

## 4. Referencias a actualizar (sin romper rutas)

Estrategia segura en 3 pasos — como todas las rutas son relativas y de la misma profundidad, un reemplazo global primero y 6 correcciones puntuales después:

**Paso A — global en index.html:** `assets/imagenes/` → `assets/images/` (21 ocurrencias)
Cubre: img src/srcset, `<source>`, preload, favicon, CSS url(), JS agentBgImages.

**Paso B — 6 correcciones puntuales en index.html:**
| Línea | Antes | Después |
|---|---|---|
| 12 | href="assets/images/favicon.svg" | href="assets/icons/favicon.svg" |
| 13 | href="assets/images/favicon.svg" | href="assets/icons/favicon.svg" |
| 764 | src="assets/images/tiktok_art.svg" | src="assets/icons/tiktok_art.svg" |
| 767 | src="assets/images/youtube_art.svg" | src="assets/icons/youtube_art.svg" |
| 819 | src="assets/images/sageAURA.webm" | src="assets/videos/sageAURA.webm" |
| 1053 | sage: 'assets/images/sage_art.avif' | (ya correcto tras Paso A) |

**Paso C — URLs absolutas + webmanifest (3+1):**
- Líneas 22, 23, 31 (og:image, twitter:image, JSON-LD image):
  `https://bengmz9-hub.github.io/web-amy-valorant/assets/imagenes/amy_art.webp`
  → `https://bengmz9-hub.github.io/web-amy-valorant/assets/images/amy_art.webp`
- `site.webmanifest`: `"src": "assets/imagenes/favicon.svg"` → `"src": "assets/icons/favicon.svg"`

**Paso D — docs (prosa, no funcional):**
- `docs/concepto-landing.md` líneas 22, 25, 29: actualizar la ruta documentada a `assets/images/`.

## 5. Receta de ejecución (cuando se apruebe)

```bash
cd "/c/Users/rgs84/AMY WEB PROJECT/landing-page"
# 1. Crear estructura destino
mkdir -p assets/images/archive assets/videos assets/icons
# 2. Mover imágenes (git mv conserva el tracking)
git mv assets/imagenes/*.webp assets/imagenes/*.avif assets/images/
git mv assets/imagenes/SAGE\ WALLPAPER.jpg assets/images/archive/
git mv assets/imagenes/pinterest-amy.png assets/images/archive/
# 3. Mover video e iconos
git mv assets/imagenes/sageAURA.webm assets/videos/
git mv assets/imagenes/tiktok_art.svg assets/images/youtube_art.svg assets/icons/
git mv assets/imagenes/favicon.svg assets/icons/
# 4. Eliminar carpeta vacía
rmdir assets/imagenes
# 5. Reemplazos en index.html (Paso A + B) y webmanifest (Paso C)
# 6. Verificación local: ver-local.bat → :8765, consola sin 404
```

## 6. Verificación obligatoria (antes de subir)

1. `grep -rn "assets/imagenes" .` → 0 resultados (en código; docs actualizadas).
2. Servir local (`ver-local.bat`, puerto 8765) → consola del navegador sin errores 404.
3. Comprobar visualmente: hero portal, video Pinterest, 3 cards de agentes, favicon, fondo.
4. Tras deploy: `curl -sI https://bengmz9-hub.github.io/web-amy-valorant/assets/images/amy_art.webp` → 200.

## 7. Preparación para React/Tailwind/Next.js (futuro)

- **Next.js**: `assets/` → `public/` sin cambios internos; luego migrar `<img>`/`<picture>` a `next/image` (optimización AVIF/WebP automática, `fill` para el hero). El `agentBgImages` del JS pasa a imports de módulo o a un map de rutas públicas.
- **Tailwind**: no afecta a assets; solo `bg-[url(...)]` o `backgroundImage` en config si se quiere tokenizar el fondo `valorant_art`.
- **Fuentes**: al migrar, valorar auto-hosting de woff2 en `assets/fonts/` (mejora LCP y elimina dependencia de Google).

## 8. Archivos que NO se tocan

- `index.html` estructura, CSS embebido y JS: intactos (solo cambian 21 cadenas de ruta).
- `robots.txt`, `sitemap.xml`, `subir.bat`: sin referencias a assets.
- Imágenes externas de `media.valorant-api.com` (líneas 743-744): CDN, no aplica.
