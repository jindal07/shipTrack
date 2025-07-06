# 🏁 Quick Start Checklist

## ✅ Prerequisites Check
- [ ] Node.js installed (v18+)
- [ ] npm installed 
- [ ] Git installed

## 🚀 First Time Setup
1. [ ] Clone the repository
2. [ ] Run `npm install` in root directory
3. [ ] Run `cd backend && npm install`
4. [ ] Verify `.env` files are configured:
   - Frontend: `VITE_API_URL=http://localhost:5001/api`
   - Backend: `PORT=5001`, `CLIENT_URL=http://localhost:5173`

## 🏃‍♂️ Running the Application

### Option 1: Quick Start (Windows)
```bash
start.bat
```

### Option 2: Quick Start (macOS/Linux)
```bash
./start.sh
```

### Option 3: Manual Start
**Terminal 1:**
```bash
cd backend
npm run dev
```

**Terminal 2:**
```bash
npm run dev
```

## 🌐 Access Points
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001
- **Health Check**: http://localhost:5001/api/health

## 🧪 Testing the Application
1. [ ] Open http://localhost:5173
2. [ ] Register a new account
3. [ ] Login with your credentials
4. [ ] Create a test shipment
5. [ ] View shipment on dashboard
6. [ ] Track shipment using tracking number

## 🐛 Common Issues
- **Port in use**: Kill processes with `npx kill-port 5001` or `npx kill-port 5173`
- **Dependencies missing**: Run `npm install` in both root and backend folders
- **Database errors**: Database will be auto-created as `backend/shipment.db`

## 📁 Key Files to Know
- `src/pages/` - All page components
- `src/components/` - Reusable UI components
- `backend/src/controllers/` - API logic
- `backend/src/routes/` - API endpoints
- `backend/src/models/database.ts` - Database setup

Happy coding! 🎉
