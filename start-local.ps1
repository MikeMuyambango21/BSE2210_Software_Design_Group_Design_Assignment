Write-Host "Starting Events App on localhost..." -ForegroundColor Green

# Start Backend
Write-Host "`n[1/2] Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; npm run dev"

Start-Sleep -Seconds 3

# Start Frontend  
Write-Host "[2/2] Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev"

Write-Host "`n✓ Application is starting!" -ForegroundColor Green
Write-Host "`nOpen your browser:" -ForegroundColor Cyan
Write-Host "  → Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "  → Backend: http://localhost:3000" -ForegroundColor White
Write-Host "`nClose the PowerShell windows to stop the servers." -ForegroundColor Yellow

Write-Host "`nPress any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")