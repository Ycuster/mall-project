@echo off
set NODE=C:\Users\Administrator\AppData\Roaming\TRAE SOLO CN\ModularData\ai-agent\vm\tools\node\node.exe
set NPM=C:\Users\Administrator\AppData\Roaming\TRAE SOLO CN\ModularData\ai-agent\vm\tools\node\npm.cmd
cd /d %~dp0\mall-nuxt
call "%NPM%" run build
pause