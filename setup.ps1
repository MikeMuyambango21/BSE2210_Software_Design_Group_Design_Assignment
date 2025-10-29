# Events App Setup Script

Write-Host "=== Events App Setup ===" -ForegroundColor Green

# Check if Docker is installed
Write-Host "`nChecking Docker installation..." -ForegroundColor Yellow
$dockerInstalled = $false

try {
    $dockerVersion = docker --version
    Write-Host "✓ Docker is installed" -ForegroundColor Green
    Write-Host $dockerVersion -ForegroundColor Gray
    $dockerInstalled = $true
} catch {
    Write-Host "✗ Docker is not installed" -ForegroundColor Red
    Write-Host "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    $dockerInstalled = $false
}

if ($dockerInstalled) {
    Write-Host "`nStarting Docker containers..." -ForegroundColor Yellow
    try {
        docker-compose up -d --build
        Write-Host "✓ Docker containers started successfully!" -ForegroundColor Green
        Write-Host "`n✓ Application is now running!" -ForegroundColor Green
        Write-Host "  - Frontend: http://localhost:5173" -ForegroundColor Cyan
        Write-Host "  - Backend API: http://localhost:3000" -ForegroundColor Cyan
        Write-Host "`nTo view logs, run: docker-compose logs -f" -ForegroundColor Yellow
        Write-Host "To stop the app, run: docker-compose down" -ForegroundColor Yellow
    } catch {
        Write-Host "✗ Failed to start Docker containers" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
} else {
    Write-Host "`n=== Manual Setup ===" -ForegroundColor Yellow
    Write-Host "Since Docker is not installed, you have two options:" -ForegroundColor White
    Write-Host "`n1. Install Docker Desktop (Recommended)" -ForegroundColor Cyan
    Write-Host "   - Download from: https://www.docker.com/products/docker-desktop" -ForegroundColor White
    Write-Host "   - After installation, run this script again" -ForegroundColor White
    
    Write-Host "`n2. Manual Setup" -ForegroundColor Cyan
    Write-Host "   - Install PostgreSQL: https://www.postgresql.org/download/windows/" -ForegroundColor White
    Write-Host "   - Create database 'events_app'" -ForegroundColor White
    Write-Host "   - Set DATABASE_URL in backend/.env" -ForegroundColor White
    Write-Host "   - Run: cd backend; npm install; npx prisma migrate dev" -ForegroundColor White
    Write-Host "   - Run: cd backend; npm run dev" -ForegroundColor White
    Write-Host "   - Run: cd frontend; npm install; npm run dev" -ForegroundColor White
}

Write-Host "`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")