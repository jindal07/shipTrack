import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Package, TrendingUp, Clock, CheckCircle, Activity, Truck } from 'lucide-react';
import Layout from '../components/Layout';
import ShipmentCard from '../components/ShipmentCard';
import FloatingActionButton from '../components/FloatingActionButton';
import type { Shipment } from '../types';
import api from '../utils/api';

const Dashboard: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await api.get('/shipments');
      setShipments(response.data.shipments || []);
    } catch (err: any) {
      setError('Failed to fetch shipments');
      console.error('Fetch shipments error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShipmentClick = (shipment: Shipment) => {
    navigate(`/shipment/${shipment.trackingNumber}`);
  };

  const getStats = () => {
    const totalShipments = shipments.length;
    const pendingShipments = shipments.filter(s => s.status === 'pending').length;
    const inTransitShipments = shipments.filter(s => ['picked-up', 'in-transit', 'out-for-delivery'].includes(s.status)).length;
    const deliveredShipments = shipments.filter(s => s.status === 'delivered').length;

    return { totalShipments, pendingShipments, inTransitShipments, deliveredShipments };
  };

  const stats = getStats();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-96">
          <div className="relative">
            <div className="spinner"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="h-8 w-8 text-blue-600/40" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back! 
            <span className="text-gradient block text-3xl mt-2">Ready to ship something amazing?</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Track your packages, manage shipments, and deliver excellence with our comprehensive logistics platform.
          </p>
          <button
            onClick={() => navigate('/create-shipment')}
            className="btn-primary mt-8 px-8 py-4 text-lg flex items-center space-x-3 mx-auto shadow-glow"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Shipment</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="stats-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Total Shipments</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalShipments}</p>
                <p className="text-sm text-gray-600 mt-1">All time</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg">
                <Package className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="stats-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Pending</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingShipments}</p>
                <p className="text-sm text-amber-600 mt-1">Awaiting pickup</p>
              </div>
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 rounded-2xl shadow-lg">
                <Clock className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="stats-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">In Transit</p>
                <p className="text-3xl font-bold text-gray-900">{stats.inTransitShipments}</p>
                <p className="text-sm text-blue-600 mt-1">On the way</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-2xl shadow-lg">
                <Truck className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="stats-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Delivered</p>
                <p className="text-3xl font-bold text-gray-900">{stats.deliveredShipments}</p>
                <p className="text-sm text-emerald-600 mt-1">Successfully delivered</p>
              </div>
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-4 rounded-2xl shadow-lg">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/create-shipment')}
            className="card hover-lift text-left group p-8"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Create Shipment</h3>
                <p className="text-gray-600">Start shipping your package</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/track')}
            className="card hover-lift text-left group p-8"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Track Package</h3>
                <p className="text-gray-600">Monitor your shipments</p>
              </div>
            </div>
          </button>

          <div className="card p-8">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
                <p className="text-gray-600">95% on-time delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Shipments Section */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Shipments</h2>
              <p className="text-gray-600">Track and manage your latest shipments</p>
            </div>
            {shipments.length > 0 && (
              <button
                onClick={() => navigate('/create-shipment')}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>New Shipment</span>
              </button>
            )}
          </div>
          
          {error && (
            <div className="card bg-red-50 border border-red-200 p-6 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {shipments.length === 0 ? (
            <div className="card text-center py-16">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur-lg opacity-20"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-3xl">
                  <Package className="h-16 w-16 text-white mx-auto" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No shipments yet</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Ready to send your first package? Create a shipment to get started with our premium delivery service.
              </p>
              <button
                onClick={() => navigate('/create-shipment')}
                className="btn-primary px-8 py-4 text-lg"
              >
                Create Your First Shipment
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {shipments.slice(0, 6).map((shipment) => (
                <ShipmentCard
                  key={shipment.id}
                  shipment={shipment}
                  onClick={() => handleShipmentClick(shipment)}
                />
              ))}
            </div>
          )}
          
          {shipments.length > 6 && (
            <div className="text-center mt-8">
              <button className="btn-secondary px-6 py-3">
                View All Shipments
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Floating Action Button */}
      <FloatingActionButton />
    </Layout>
  );
};

export default Dashboard;
