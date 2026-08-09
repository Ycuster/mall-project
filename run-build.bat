@echo off
set PATH=C:\Windows\System32;C:\Windows
set NODE=C:\Users\Administrator\AppData\Roaming\TRAE SOLO CN\ModularData\ai-agent\vm\tools\node\node.exe
echo Testing node...
"%NODE%" -e "console.log('node works: ' + process.version)"
echo Exit code: %ERRORLEVEL%
cd /d d:\vuetest\mall-project\mall-nuxt
echo Running npm build...
call npm run build
pause