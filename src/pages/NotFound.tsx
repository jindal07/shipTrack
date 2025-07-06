import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
      
      <div className="max-w-md w-full text-center relative z-10">
        <div className="card-glass animate-slide-up p-12">
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-gradient-to-r from-gray-500 to-gray-600 rounded-3xl shadow-xl">
              <Package className="h-16 w-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="btn-secondary flex items-center justify-center space-x-2 px-6 py-3"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Go Back</span>
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-primary flex items-center justify-center space-x-2 px-6 py-3"
            >
              <Home className="h-5 w-5" />
              <span>Go Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
