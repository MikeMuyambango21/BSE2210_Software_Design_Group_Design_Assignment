# Start Events App

Write-Host "Starting Events App..." -ForegroundColor Green

# Start backend
Write-Host "`n1. Starting Backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"
Start-Sleep -Seconds 3

# Start frontend
Write-Host "2. Starting Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "`n✓ Application is now running!" -ForegroundColor Green
Write-Host "  - Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "  - Backend API: http://localhost:3000" -ForegroundColor Cyan
Write-Host "`nClose this window to stop all servers." -ForegroundColor Yellow
