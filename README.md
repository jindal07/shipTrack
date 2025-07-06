# 📦 Shipment Delivery Application

A modern, full-stack shipment tracking application built with React, TypeScript, Node.js, and SQLite. Features a beautiful Apple-inspired UI with glassmorphism effects, complete authentication system, and real-time shipment tracking.

![Shipment Delivery App](https://img.shields.io/badge/Status-Ready%20for%20Development-brightgreen)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)

## ✨ Features

🎨 **Modern UI/UX**
- Apple-inspired design with glassmorphism effects
- Fully responsive layout for all devices
- Smooth animations and micro-interactions
- Beautiful gradient backgrounds and glass morphism

🔐 **Authentication System**
- Secure user registration and login
- JWT-based authentication
- Protected routes and middleware
- Password hashing with bcrypt

📦 **Shipment Management**
- Create new shipments with detailed information
- Real-time tracking system
- Status updates (pending, shipped, delivered)
- Search and filter shipments

🚀 **Technical Features**
- Full-stack TypeScript application
- RESTful API architecture
- SQLite database with proper relations
- Input validation on both frontend and backend
- Error handling and user feedback

## 🛠 Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **SQLite** for database
- **JWT** for authentication
- **bcrypt** for password hashing
- **express-validator** for input validation

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd shipment
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up Environment Variables**

   **Frontend (.env)**
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```

   **Backend (backend/.env)**
   ```env
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-for-development-only
   PORT=5001
   CLIENT_URL=http://localhost:5173
   ```

   > **Note:** The `.env` files are already configured for local development. You can modify them if needed.

## 🏃‍♂️ Running the Application

### Option 1: Run Both Servers Simultaneously

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
Server will start at: `http://localhost:5001`

**Terminal 2 - Frontend Server:**
```bash
npm run dev
```
Frontend will start at: `http://localhost:5173` (or next available port)

### Option 2: Quick Start Scripts

**Windows (start.bat):**
```batch
@echo off
echo Starting Shipment Delivery Application...
start cmd /k "cd backend && npm run dev"
timeout /t 3
start cmd /k "npm run dev"
echo Both servers are starting...
```

**macOS/Linux (start.sh):**
```bash
#!/bin/bash
echo "Starting Shipment Delivery Application..."
cd backend && npm run dev &
cd .. && npm run dev &
wait
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### Shipments
- `GET /api/shipments` - Get user's shipments
- `POST /api/shipments` - Create new shipment
- `GET /api/shipments/:trackingNumber` - Get shipment details
- `PUT /api/shipments/:trackingNumber/status` - Update shipment status

### Health Check
- `GET /api/health` - Server health check

## 📱 Application Structure

```
shipment/
├── src/                    # Frontend source code
│   ├── components/         # Reusable React components
│   │   ├── Layout.tsx      # Main layout wrapper
│   │   ├── Navbar.tsx      # Navigation component
│   │   ├── ShipmentCard.tsx # Shipment display card
│   │   ├── ProtectedRoute.tsx # Route protection
│   │   └── FloatingActionButton.tsx # Quick action button
│   ├── pages/              # Page components
│   │   ├── Login.tsx       # Login page
│   │   ├── Register.tsx    # Registration page
│   │   ├── Dashboard.tsx   # Main dashboard
│   │   ├── CreateShipment.tsx # New shipment form
│   │   ├── ShipmentDetails.tsx # Shipment details view
│   │   ├── TrackShipment.tsx # Public tracking page
│   │   └── NotFound.tsx    # 404 error page
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication context
│   ├── utils/              # Utility functions
│   │   ├── api.ts          # API client configuration
│   │   └── helpers.ts      # Helper functions
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # All type definitions
│   └── index.css           # Global styles and Tailwind config
├── backend/                # Backend source code
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   │   ├── authController.ts # Authentication logic
│   │   │   └── shipmentController.ts # Shipment logic
│   │   ├── models/         # Database models
│   │   │   ├── database.ts # Database connection and schema
│   │   │   └── types.ts    # Backend type definitions
│   │   ├── routes/         # API routes
│   │   │   ├── auth.ts     # Authentication routes
│   │   │   └── shipments.ts # Shipment routes
│   │   ├── middleware/     # Express middleware
│   │   │   └── auth.ts     # JWT authentication middleware
│   │   ├── utils/          # Backend utilities
│   │   │   └── helpers.ts  # Helper functions
│   │   └── index.ts        # Main server file
│   └── shipment.db         # SQLite database (auto-created)
└── README.md               # This file
```

## 🎯 Key Features Guide

### 1. User Authentication
- **Register**: Create a new account with email and password
- **Login**: Secure login with JWT token generation
- **Protected Routes**: Automatic redirection for unauthenticated users

### 2. Shipment Creation
- **Sender Information**: Name, address, phone number
- **Receiver Information**: Name, address, phone number  
- **Package Details**: Size, weight, description
- **Automatic Tracking**: Generated tracking number

### 3. Dashboard
- **Shipment Overview**: All user shipments at a glance
- **Quick Actions**: Create new shipment with floating action button
- **Search & Filter**: Find specific shipments quickly
- **Status Indicators**: Visual status badges

### 4. Tracking System
- **Real-time Updates**: Current shipment status
- **Progress Tracking**: Visual progress indicators
- **Estimated Delivery**: Calculated delivery dates
- **Public Tracking**: Share tracking with others

## 🛡️ Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for development
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Input sanitization

## 🎨 UI/UX Features

- **Glassmorphism**: Modern glass-like UI elements
- **Gradient Backgrounds**: Beautiful color gradients
- **Micro-interactions**: Smooth hover and click effects
- **Loading States**: Proper loading indicators
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on all screen sizes

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use:**
```bash
# Kill process on port 5001 (backend)
npx kill-port 5001

# Kill process on port 5173 (frontend)  
npx kill-port 5173
```

**Database Connection Issues:**
- The SQLite database file will be automatically created
- Check file permissions in the backend directory
- Database location: `backend/shipment.db`

**API Connection Issues:**
- Verify backend server is running on port 5001
- Check CORS settings in `backend/src/index.ts`
- Ensure `VITE_API_URL` matches backend URL

**Build Issues:**
- Clear node_modules and reinstall dependencies
- Check TypeScript errors: `npm run lint`
- Verify all environment variables are set

### Debug Commands

```bash
# Check if servers are running
curl http://localhost:5001/api/health
curl http://localhost:5173

# View backend logs
cd backend && npm run dev

# Check build output
npm run build
cd backend && npm run build

# Check dependencies
npm list
cd backend && npm list
```

## 📝 Development Tips

### Adding New Features
1. **Frontend**: Add components in `src/components/` or pages in `src/pages/`
2. **Backend**: Add routes in `backend/src/routes/` and controllers in `backend/src/controllers/`
3. **Database**: Modify schema in `backend/src/models/database.ts`
4. **Types**: Update TypeScript types in respective `types/` folders

### Code Style
- Use TypeScript for type safety
- Follow React Hooks patterns
- Use functional components
- Implement proper error handling
- Use async/await for async operations

### Testing
- Test API endpoints with Postman or curl
- Test UI components in the browser
- Verify authentication flows
- Test responsive design on different screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React and Vite teams for excellent development tools
- Tailwind CSS for the utility-first CSS framework
- Lucide React for beautiful icons
- Express.js for the robust backend framework

---

**Happy coding!** 🚀

If you encounter any issues or have questions, please check the troubleshooting section above or open an issue in the repository.
