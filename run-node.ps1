$ErrorActionPreference = 'Continue'
$env:PATH = 'C:\Windows\System32;C:\Windows'
$nodePath = 'C:\Users\Administrator\AppData\Roaming\TRAE SOLO CN\ModularData\ai-agent\vm\tools\node\node.exe'
Write-Host "Node path exists: $(Test-Path $nodePath)"
& $nodePath -e "console.log('node works: ' + process.version)"
Write-Host "Exit code: $LASTEXITCODE"