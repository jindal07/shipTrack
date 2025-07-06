@echo off
echo 🚀 Starting Shipment Delivery Application...
echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"
echo.
echo Waiting 3 seconds for backend to start...
timeout /t 3 >nul
echo.
echo Starting Frontend Server...
start "Frontend Server" cmd /k "npm run dev"
echo.
echo ✅ Both servers are starting!
echo.
echo 📱 Frontend will be available at: http://localhost:5173
echo 🔗 Backend API will be available at: http://localhost:5001
echo.
echo Press any key to close this window...
pause >nul
