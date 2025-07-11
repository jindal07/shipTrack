import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, Calendar, User, Phone } from 'lucide-react';
import Layout from '../components/Layout.jsx';
import { getStatusText, formatDate } from '../utils/helpers.js';
import api from '../utils/api.js';

const ShipmentDetails = () => {
  const { trackingNumber } = useParams();
  const [shipment, setShipment] = useState(null);
  const [trackingEvents, setTrackingEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (trackingNumber) {
      fetchShipmentDetails();
    }
  }, [trackingNumber]);

  const fetchShipmentDetails = async () => {
    try {
      const response = await api.get(`/shipments/${trackingNumber}`);
      setShipment(response.data.shipment);
      setTrackingEvents(response.data.trackingEvents || []);
    } catch (err) {
      setError('Failed to fetch shipment details');
      console.error('Fetch shipment details error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getTimelineSteps = () => {
    if (!shipment) return [];
    
    const allStatuses = ['pending', 'picked-up', 'in-transit', 'out-for-delivery', 'delivered'];
    const currentStatusIndex = allStatuses.indexOf(shipment.status);
    
    return allStatuses.map((status, index) => ({
      status,
      label: getStatusText(status),
      completed: index <= currentStatusIndex,
      current: index === currentStatusIndex,
    }));
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="card-glass animate-slide-up text-center p-12">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading shipment details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !shipment) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="card-glass animate-slide-up p-12">
            <div className="p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl shadow-xl inline-block mb-6">
              <Package className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipment Not Found</h2>
            <p className="text-gray-600 mb-8">
              {error || 'We couldn\'t find the shipment you\'re looking for. Please check the tracking number and try again.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/track')}
                className="btn-primary px-6 py-3"
              >
                Try Another Tracking Number
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-secondary px-6 py-3"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const timelineSteps = getTimelineSteps();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 group transition-all duration-200 hover:bg-gray-100/50 px-3 py-2 rounded-xl"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
          
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-xl">
                <Package className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Shipment Details</h1>
            <p className="text-lg text-gray-600">Tracking Number: {shipment.trackingNumber}</p>
          </div>
        </div>

        {/* Status Overview */}
        <div className="card-glass mb-8 animate-slide-up">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div className="mb-4 lg:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Current Status</h2>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>Created: {formatDate(shipment.createdAt)}</span>
              </div>
            </div>
            <div className={`shipment-status-${shipment.status} animate-scale-in text-lg px-6 py-3`}>
              {getStatusText(shipment.status)}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl text-center">
              <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Package Size</p>
              <p className="font-semibold text-gray-900 capitalize">{shipment.packageSize}</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl text-center">
              <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Weight</p>
              <p className="font-semibold text-gray-900">
                {shipment.weight ? `${shipment.weight} kg` : 'Not specified'}
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl text-center">
              <User className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Sender</p>
              <p className="font-semibold text-gray-900">{shipment.senderName}</p>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl text-center">
              <User className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Receiver</p>
              <p className="font-semibold text-gray-900">{shipment.receiverName}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sender & Receiver Details */}
          <div className="space-y-6">
            {/* Sender Information */}
            <div className="card-glass animate-slide-up">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                  <User className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Sender Information</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Name</p>
                  <p className="text-lg font-medium text-gray-900">{shipment.senderName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Address</p>
                  <p className="text-gray-700">{shipment.senderAddress}</p>
                </div>
                {shipment.senderPhone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{shipment.senderPhone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Receiver Information */}
            <div className="card-glass animate-slide-up">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <User className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Receiver Information</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Name</p>
                  <p className="text-lg font-medium text-gray-900">{shipment.receiverName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Address</p>
                  <p className="text-gray-700">{shipment.receiverAddress}</p>
                </div>
                {shipment.receiverPhone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{shipment.receiverPhone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Timeline & Events */}
          <div className="space-y-6">
            {/* Timeline */}
            <div className="card-glass animate-slide-up">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Shipment Progress</h3>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                
                <div className="space-y-6">
                  {timelineSteps.map((step) => (
                    <div key={step.status} className="relative flex items-center">
                      {/* Timeline dot */}
                      <div className="relative z-10 flex items-center justify-center w-16 h-16">
                        <div className={`${
                          step.completed
                            ? step.current
                              ? 'timeline-step-active'
                              : 'timeline-step-completed'
                            : 'timeline-step-inactive'
                        } w-3 h-3 rounded-full`}></div>
                      </div>
                      
                      {/* Timeline content */}
                      <div className="ml-4 flex-grow">
                        <div className={`p-4 rounded-2xl transition-all duration-500 ${
                          step.completed
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50'
                            : 'bg-gray-50 border border-gray-200/50'
                        }`}>
                          <h4 className={`font-medium ${
                            step.completed ? 'text-blue-900' : 'text-gray-600'
                          }`}>
                            {step.label}
                          </h4>
                          {step.completed && (
                            <p className="text-xs text-blue-700 mt-1">
                              {step.current ? 'Current status' : 'Completed'}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="card-glass animate-slide-up">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Package Details</h3>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Size</p>
                    <p className="text-gray-900 font-medium capitalize">{shipment.packageSize}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Weight</p>
                    <p className="text-gray-900 font-medium">
                      {shipment.weight ? `${shipment.weight} kg` : 'Not specified'}
                    </p>
                  </div>
                </div>
                {shipment.description && (
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Description</p>
                    <p className="text-gray-700">{shipment.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Events */}
        {trackingEvents.length > 0 && (
          <div className="card-glass mt-8 animate-slide-up">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Tracking History</h3>
            <div className="space-y-4">
              {trackingEvents.map((event, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-grow">
                    <p className="font-medium text-gray-900">{event.description}</p>
                    <p className="text-sm text-gray-600 mt-1">{formatDate(event.timestamp)}</p>
                    {event.location && (
                      <p className="text-sm text-gray-500">{event.location}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ShipmentDetails;
