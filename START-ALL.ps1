# CRM System - Complete Startup Script for PowerShell
# Run this script to start all services (Backend, Database, Frontend)

param(
    [switch]$InstallDeps
)

Write-Host ""
Write-Host "========================================"
Write-Host "  CRM System - Starting All Services"
Write-Host "========================================"
Write-Host ""

# Determine project root
$currentPath = Get-Location
if ($currentPath.Path.EndsWith("client")) {
    Set-Location ..
}

$projectRoot = Get-Location
Write-Host "[*] Project Root: $projectRoot"
Write-Host ""

# Verify folders exist
if (-not (Test-Path "server")) {
    Write-Host "[ERROR] Server folder not found!" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "client")) {
    Write-Host "[ERROR] Client folder not found!" -ForegroundColor Red
    exit 1
}

Write-Host "[*] Checking dependencies..."
Write-Host ""

# Check and install dependencies if needed
if (-not (Test-Path "server\node_modules") -or $InstallDeps) {
    Write-Host "[INFO] Installing server dependencies..." -ForegroundColor Yellow
    Set-Location "server"
    npm install
    Set-Location ..
    Write-Host "[OK] Server dependencies installed" -ForegroundColor Green
    Write-Host ""
}

if (-not (Test-Path "client\node_modules") -or $InstallDeps) {
    Write-Host "[INFO] Installing client dependencies..." -ForegroundColor Yellow
    Set-Location "client"
    npm install
    Set-Location ..
    Write-Host "[OK] Client dependencies installed" -ForegroundColor Green
    Write-Host ""
}

Write-Host "[*] Starting Backend Server..." -ForegroundColor Cyan
Start-Process -FilePath "cmd.exe" -ArgumentList "/k cd server && npm start" -WindowStyle Normal

# Wait for server to start
Write-Host "[*] Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host "[*] Starting Frontend..." -ForegroundColor Cyan
Start-Process -FilePath "cmd.exe" -ArgumentList "/k cd client && npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "========================================"
Write-Host "[OK] All services started!" -ForegroundColor Green
Write-Host "========================================"
Write-Host ""
Write-Host "[INFO] Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "[INFO] Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "[INFO] MySQL:    localhost:3306" -ForegroundColor White
Write-Host ""
Write-Host "[*] Open your browser and go to: http://localhost:5173" -ForegroundColor Yellow
Write-Host "[*] To stop all services, close the console windows" -ForegroundColor Yellow
Write-Host ""
