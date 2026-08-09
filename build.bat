@echo off
chcp 65001 >nul
cd /d d:\vuetest\mall-project\mall-nuxt
echo === Installing dependencies ===
call npm install --no-audit --no-fund
echo === Build started ===
call npm run build
echo === Exit code: %ERRORLEVEL% ===
pause