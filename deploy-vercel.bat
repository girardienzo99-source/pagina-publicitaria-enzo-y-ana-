@echo off
chcp 65001 > nul
echo ========================================================
echo   PUBLICAR RÍO CUARTO WEB A PRODUCCIÓN (VERCEL)
echo ========================================================
echo.
echo 1. Verificando sesión en Vercel...
call npx vercel login
echo.
echo 2. Compilando y subiendo cambios a producción...
call npm run build
call npx vercel --prod --yes
echo.
echo ========================================================
echo   ¡PUBLICACIÓN COMPLETADA CON ÉXITO!
echo   Ingresá a: https://riocuarto-web.online
echo ========================================================
echo.
pause
