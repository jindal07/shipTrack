import { useState } from 'react';
import { Search, Package } from 'lucide-react';
import Layout from '../components/Layout.jsx';
import { getStatusText, formatDate } from '../utils/helpers.js';
import api from '../utils/api.js';

const TrackShipment = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState(null);
  const [trackingEvents, setTrackingEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setIsLoading(true);
    setError('');
    setShipment(null);
    setTrackingEvents([]);

    try {
      const response = await api.get(`/shipments/${trackingNumber.trim()}`);
      setShipment(response.data.shipment);
      setTrackingEvents(response.data.trackingEvents || []);
    } catch (_err) {
      setError('Shipment not found or you do not have access to this tracking number');
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

  const timelineSteps = getTimelineSteps();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-xl">
              <Package className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Track Your Shipment</h1>
          <p className="text-lg text-gray-600">Enter your tracking number to see real-time status updates</p>
        </div>

        {/* Search Form */}
        <div className="card-glass mb-8 animate-slide-up">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Enter tracking number (e.g., SHP123456ABC)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="input-field w-full"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center justify-center space-x-2 px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  <span>Track Package</span>
                </>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="card bg-red-50 border border-red-200 p-6 mb-8 animate-slide-up">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {shipment && (
          <div className="space-y-8">
            {/* Shipment Details */}
            <div className="card-glass animate-slide-up">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Tracking #{shipment.trackingNumber}</h2>
                  <p className="text-gray-600">From {shipment.senderName} to {shipment.receiverName}</p>
                </div>
                <div className="mt-4 lg:mt-0">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    shipment.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    shipment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {getStatusText(shipment.status)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sender</h3>
                  <p className="text-gray-600">{shipment.senderName}</p>
                  <p className="text-gray-600">{shipment.senderAddress}</p>
                  {shipment.senderPhone && <p className="text-gray-600">{shipment.senderPhone}</p>}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Receiver</h3>
                  <p className="text-gray-600">{shipment.receiverName}</p>
                  <p className="text-gray-600">{shipment.receiverAddress}</p>
                  {shipment.receiverPhone && <p className="text-gray-600">{shipment.receiverPhone}</p>}
                </div>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="card-glass animate-slide-up">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Delivery Progress</h3>
              <div className="space-y-4">
                {timelineSteps.map((step, index) => (
                  <div key={step.status} className="flex items-center">
                    <div className="flex items-center flex-shrink-0">
                      <div className={`w-4 h-4 rounded-full ${
                        step.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      {index < timelineSteps.length - 1 && (
                        <div className={`w-px h-8 ml-2 ${
                          step.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                      )}
                    </div>
                    <div className="ml-4">
                      <p className={`font-medium ${
                        step.current ? 'text-blue-600' : step.completed ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {step.label}
                      </p>
                      {step.current && <p className="text-sm text-gray-500">Current status</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking Events */}
            {trackingEvents.length > 0 && (
              <div className="card-glass animate-slide-up">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Tracking History</h3>
                <div className="space-y-4">
                  {trackingEvents.map((event, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-grow">
                        <p className="font-medium text-gray-900">{getStatusText(event.status)}</p>
                        {event.description && <p className="text-gray-600">{event.description}</p>}
                        {event.location && <p className="text-sm text-gray-500">Location: {event.location}</p>}
                        <p className="text-sm text-gray-500">{formatDate(event.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TrackShipment;
