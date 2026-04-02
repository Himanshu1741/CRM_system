@echo off
REM ===================================================================
REM CRM System - Complete Startup Script
REM ===================================================================
REM This script will:
REM 1. Check if MySQL is installed
REM 2. Install dependencies if needed
REM 3. Start the backend server (port 5000)
REM 4. Start the frontend (port 5173)
REM ===================================================================

echo.
echo ========================================
echo   CRM System - Starting All Components
echo ========================================
echo.

REM Check if Node.js is installed
echo [1/5] Checking Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo [✓] Node.js is installed
echo.

REM Check if MySQL is running
echo [2/5] Checking MySQL service...
sc query MySQL80 >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] MySQL service not found or not running
    echo Make sure MySQL is running before proceeding
    echo You can start MySQL from: Services panel or MySQL Command Line
) else (
    echo [✓] MySQL is running
)
echo.

REM Check if concurrently is installed at root
echo [3/5] Checking dependencies...
if not exist "node_modules\concurrently" (
    echo Installing concurrently package...
    call npm install concurrently --save-dev
)
echo [✓] Dependencies ready
echo.

REM Check server dependencies
echo [4/5] Checking server dependencies...
if not exist "server\node_modules" (
    echo Installing server dependencies...
    cd server
    call npm install
    cd ..
)
echo [✓] Server dependencies ready
echo.

REM Check client dependencies
echo [5/5] Checking client dependencies...
if not exist "client\node_modules" (
    echo Installing client dependencies...
    cd client
    call npm install
    cd ..
)
echo [✓] Client dependencies ready
echo.

echo ========================================
echo   Starting CRM System...
echo ========================================
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:5173
echo.
echo Starting servers (this window will stay open)...
echo Press Ctrl+C to stop both servers
echo.

REM Start both servers using npm concurrently
call npm run dev

pause
