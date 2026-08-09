Set-Location "d:\vuetest\mall-project\mall-nuxt"
Write-Host "Current directory: $(Get-Location)"
Write-Host "Installing dependencies..."
& npm install --no-audit --no-fund
Write-Host "Exit code: $LASTEXITCODE"
Write-Host "Building..."
& npm run build
Write-Host "Build exit code: $LASTEXITCODE"
Write-Host "Done."