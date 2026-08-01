@echo off
cd /d "%~dp0"
echo ============================================
echo  AMY WEB (React) - servidor local
echo  URL: http://localhost:5173/
echo  Ctrl+C para detener
echo ============================================
call npm run dev -- --port 5173 --strictPort
