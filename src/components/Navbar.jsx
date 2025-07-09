import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, LogOut, User, Plus, Search, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="nav-blur sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                ShipTrack
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/50 backdrop-blur-sm"
            >
              Dashboard
            </Link>
            <Link
              to="/track"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/50 backdrop-blur-sm"
            >
              <Search className="h-4 w-4" />
              <span>Track</span>
            </Link>
            <Link
              to="/create-shipment"
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 ml-4"
            >
              <Plus className="h-4 w-4" />
              <span>New Shipment</span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-white/30 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-gray-500 text-xs">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-red-50/50 backdrop-blur-sm"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-gray-900 p-2 rounded-xl hover:bg-white/50 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-slide-up">
          <div className="px-4 pt-2 pb-6 space-y-2 bg-white/80 backdrop-blur-xl border-t border-white/20">
            <Link
              to="/dashboard"
              className="block text-gray-700 hover:text-gray-900 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-white/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/track"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-white/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Search className="h-4 w-4" />
              <span>Track Shipment</span>
            </Link>
            <Link
              to="/create-shipment"
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl text-base font-semibold shadow-lg mx-2 mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Plus className="h-4 w-4" />
              <span>New Shipment</span>
            </Link>
            
            {/* Mobile User Info */}
            <div className="border-t border-white/20 pt-4 mt-4">
              <div className="flex items-center space-x-3 px-4 py-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-gray-500 text-sm">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-red-50/50 w-full mt-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
