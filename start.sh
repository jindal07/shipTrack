#!/bin/bash

echo "🚀 Starting Shipment Delivery Application..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Checking dependencies..."

# Check if node_modules exists in root
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Check if node_modules exists in backend
if [ ! -d "backend/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

echo "✅ Dependencies are ready!"
echo ""

echo "🔧 Starting Backend Server..."
cd backend && npm run dev &
BACKEND_PID=$!
cd ..

echo "⏳ Waiting 3 seconds for backend to start..."
sleep 3

echo "🎨 Starting Frontend Server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are starting!"
echo ""
echo "📱 Frontend will be available at: http://localhost:5173"
echo "🔗 Backend API will be available at: http://localhost:5001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for background processes
wait $BACKEND_PID $FRONTEND_PID
