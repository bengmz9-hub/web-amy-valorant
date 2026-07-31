# CONCEPTO DE LA LANDING (AMY)

La landing ya existe y funciona (index.html, GitHub Pages). Este documento define su rol
en el proyecto y las mejoras futuras. La landing es el HUB del proyecto, no un adorno.

## Rol actual

- Portfolio tactico: presentacion de AMY, main Sage, estadisticas, clips y mejores momentos.
- Publicada en GitHub Pages via subir.bat (git pull + push).

## Rol futuro (cuando el canal crezca, fase 3)

1. CENTRO DE LINKS: unico lugar con todos los perfiles (TikTok, YouTube, Discord, etc).
   Sustituye al linktree generico. La landing ES el linktree de AMY.
2. CLIPS DESTACADOS: los 3-5 mejores shorts del canal embebidos.
3. LISTA DE EMAIL: capturar emails desde YA. El algoritmo quita audiencia cuando quiere;
   el email no. (Form simple -> conectar a un servicio cuando llegue el momento.)
4. MARCAS/COLABS: seccion "contacto" profesional para futuros sponsors.

## Mejoras pendientes

- [x] Enlace a YouTube anadido (2026-07-31): header + footer + JSON-LD. Icono youtube_art.svg en assets/imagenes/
- [ ] Seccion de clips de YouTube embebidos (cuando el canal tenga shorts)
- [ ] Formulario de email
- [ ] Favicon/manifest ya apuntan a assets/imagenes/ (reorganizacion hecha 2026-07-31)

## Notas de mantenimiento

- Las imagenes viven en landing-page/assets/imagenes/. No poner nada fuera.
- Las maquetas antiguas (docs/ideas/) se conservan como referencia de diseno.
- Regla: cualquier cambio en la landing se prueba en local (abrir index.html) antes de subir.bat.
