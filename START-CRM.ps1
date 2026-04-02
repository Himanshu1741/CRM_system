# ===================================================================
# CRM System - Complete Startup Script (PowerShell)
# ===================================================================
# This script will:
# 1. Check if MySQL is installed
# 2. Install dependencies if needed
# 3. Start the backend server (port 5000)
# 4. Start the frontend (port 5173)
# ===================================================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  CRM System - Starting All Components" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
Write-Host "[1/5] Checking Node.js installation..." -ForegroundColor Yellow
$nodeCheck = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCheck) {
  Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
  Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
  Read-Host "Press Enter to exit"
  exit 1
}
Write-Host "[✓] Node.js is installed" -ForegroundColor Green
Write-Host ""

# Check if MySQL is running
Write-Host "[2/5] Checking MySQL service..." -ForegroundColor Yellow
$mysqlService = Get-Service -Name "MySQL80" -ErrorAction SilentlyContinue
if (-not $mysqlService -or $mysqlService.Status -ne "Running") {
  Write-Host "[!] MySQL service not found or not running" -ForegroundColor Yellow
  Write-Host "Make sure MySQL is running before proceeding" -ForegroundColor Yellow
  Write-Host "You can start MySQL from: Services panel or MySQL Command Line" -ForegroundColor Yellow
}
else {
  Write-Host "[✓] MySQL is running" -ForegroundColor Green
}
Write-Host ""

# Check if concurrently is installed
Write-Host "[3/5] Checking dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules\concurrently")) {
  Write-Host "Installing concurrently package..." -ForegroundColor Yellow
  npm install concurrently --save-dev
}
Write-Host "[✓] Dependencies ready" -ForegroundColor Green
Write-Host ""

# Check server dependencies
Write-Host "[4/5] Checking server dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "server\node_modules")) {
  Write-Host "Installing server dependencies..." -ForegroundColor Yellow
  Push-Location server
  npm install
  Pop-Location
}
Write-Host "[✓] Server dependencies ready" -ForegroundColor Green
Write-Host ""

# Check client dependencies
Write-Host "[5/5] Checking client dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "client\node_modules")) {
  Write-Host "Installing client dependencies..." -ForegroundColor Yellow
  Push-Location client
  npm install
  Pop-Location
}
Write-Host "[✓] Client dependencies ready" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "  Starting CRM System..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend will run on: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend will run on: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting servers (this will run until you stop it)..." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow
Write-Host ""

# Start both servers
npm run dev
