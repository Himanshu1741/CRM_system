#!/usr/bin/env powershell

# Start Backend
Write-Host "🚀 Starting Backend on port 5000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd d:\crm-system\server; npm start" -WindowStyle Normal

# Wait for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "🚀 Starting Frontend on port 5173..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd d:\crm-system\client; npm run dev" -WindowStyle Normal

Write-Host "✅ Both servers starting!" -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Debug: http://localhost:5173/debug" -ForegroundColor Cyan
