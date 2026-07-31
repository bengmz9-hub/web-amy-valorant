@echo off
:: Primero descargamos los cambios de GitHub (Copilot, etc.)
git pull origin main

:: Luego subimos lo que tengamos nosotros
git add .

git status --porcelain | findstr /i ".webui_secret_key .audit public_home" && echo ERROR: ARCHIVO SENSIBLE EN STAGING, ABORTANDO && exit /b 1
git commit -m "Actualizacion automatica desde IA"

git push origin main

echo.
echo ===========================================
echo ¡Web sincronizada y subida correctamente!
echo ===========================================
pause