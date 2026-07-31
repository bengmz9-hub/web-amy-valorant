@echo off
:: Primero descargamos los cambios de GitHub (Copilot, etc.)
git pull origin main

:: Luego subimos lo que tengamos nosotros
git add .
git commit -m "Actualizacion automatica desde IA"
git push origin main

echo.
echo ===========================================
echo ¡Web sincronizada y subida correctamente!
echo ===========================================
pause