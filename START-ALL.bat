@echo off
REM CRM System - Complete Startup Script
REM This script starts the backend server and frontend from any directory

echo.
echo ========================================
echo   CRM System - Starting All Services
echo ========================================
echo.

REM Get the directory where this script is located
set SCRIPT_DIR=%~dp0

REM Check if we're in the client directory and need to go back to root
if "%CD:~-6%"=="client" (
    cd ..
)

REM Colors for output
color 0A

echo [*] Current Directory: %CD%
echo.

REM Check if server folder exists
if not exist "server" (
    echo [ERROR] Server folder not found! Make sure you're in the project root.
    pause
    exit /b 1
)

REM Check if client folder exists
if not exist "client" (
    echo [ERROR] Client folder not found! Make sure you're in the project root.
    pause
    exit /b 1
)

echo [*] Checking dependencies...
echo.

REM Install server dependencies if node_modules don't exist
if not exist "server\node_modules" (
    echo [INFO] Installing server dependencies...
    cd server
    call npm install
    cd ..
    echo [OK] Server dependencies installed
    echo.
)

REM Install client dependencies if node_modules don't exist
if not exist "client\node_modules" (
    echo [INFO] Installing client dependencies...
    cd client
    call npm install
    cd ..
    echo [OK] Client dependencies installed
    echo.
)

echo [*] Starting Backend Server...
start "CRM Backend Server" cmd /k "cd server && npm start"

REM Wait for server to start
timeout /t 3 /nobreak

echo [*] Starting Frontend...
start "CRM Frontend" cmd /k "cd client && npm run dev"

echo.
echo ========================================
echo [OK] All services started!
echo ========================================
echo.
echo [INFO] Backend: http://localhost:5000
echo [INFO] Frontend: http://localhost:5173
echo [INFO] MySQL: localhost:3306
echo.
echo [*] Open your browser and go to: http://localhost:5173
echo [*] Close the console windows to stop the services
echo.
pause
