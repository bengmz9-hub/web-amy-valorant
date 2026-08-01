@echo off
REM ============================================================
REM  ver-local.bat - levanta la web de AMY en localhost y abre
REM  el navegador en el hero v3 (premium). Cierre: cerrar la
REM  ventana "AMY local" o Ctrl+C en ella.
REM  Uso: doble clic, o desde terminal:  ver-local.bat
REM ============================================================
setlocal
cd /d "%~dp0landing-page"

REM comprueba si ya hay un servidor en :8765
netstat -an | findstr ":8765" | findstr "LISTENING" >nul
if %errorlevel%==0 (
  echo [ver-local] Ya hay un servidor en :8765 - no arranco otro.
) else (
  echo [ver-local] Arrancando servidor local en :8765...
  start "AMY local" /min cmd /c "python -m http.server 8765"
  timeout /t 2 /nobreak >nul
)

start "" "http://localhost:8765/docs/ideas/hero-v3/"
echo [ver-local] Navegador abierto en http://localhost:8765/docs/ideas/hero-v3/
echo [ver-local] Variantes: hero-v2 (esports) en .../hero-v2/  y  web real en /index.html
endlocal
