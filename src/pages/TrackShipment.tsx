import React, { useState } from 'react';
import { Search, Package } from 'lucide-react';
import Layout from '../components/Layout';
import type { Shipment, TrackingEvent } from '../types';
import { getStatusText, formatDate } from '../utils/helpers';
import api from '../utils/api';

const TrackShipment: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
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
    } catch (err: any) {
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
              <Search className="h-5 w-5" />
              <span>{isLoading ? 'Searching...' : 'Track Package'}</span>
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 text-red-700 px-6 py-4 rounded-2xl backdrop-blur-sm mb-6 animate-slide-up">
            <div className="flex">
              <div className="text-sm font-medium">{error}</div>
            </div>
          </div>
        )}

        {/* Results */}
        {shipment && (
          <div className="space-y-8">
            {/* Shipment Overview */}
            <div className="card-glass animate-slide-up">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{shipment.trackingNumber}</h2>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span className="font-medium">From:</span>
                    <span>{shipment.senderName}</span>
                    <span className="text-gray-400">→</span>
                    <span className="font-medium">To:</span>
                    <span>{shipment.receiverName}</span>
                  </div>
                </div>
                <div className={`shipment-status-${shipment.status} animate-scale-in`}>
                  {getStatusText(shipment.status)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl">
                  <h3 className="font-semibold text-gray-900 mb-2">Sender</h3>
                  <p className="text-gray-700">{shipment.senderName}</p>
                  <p className="text-sm text-gray-600 mt-1">{shipment.senderAddress}</p>
                  {shipment.senderPhone && (
                    <p className="text-sm text-gray-600">{shipment.senderPhone}</p>
                  )}
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
                  <h3 className="font-semibold text-gray-900 mb-2">Receiver</h3>
                  <p className="text-gray-700">{shipment.receiverName}</p>
                  <p className="text-sm text-gray-600 mt-1">{shipment.receiverAddress}</p>
                  {shipment.receiverPhone && (
                    <p className="text-sm text-gray-600">{shipment.receiverPhone}</p>
                  )}
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl">
                  <h3 className="font-semibold text-gray-900 mb-2">Package Details</h3>
                  <p className="text-gray-700 capitalize">{shipment.packageSize}</p>
                  {shipment.weight && (
                    <p className="text-sm text-gray-600">{shipment.weight} kg</p>
                  )}
                  <p className="text-sm text-gray-600 mt-1">
                    Created: {formatDate(shipment.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            {timelineSteps.length > 0 && (
              <div className="card-glass animate-slide-up">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Shipment Timeline</h3>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                  
                  <div className="space-y-8">
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
                          } w-4 h-4 rounded-full`}></div>
                        </div>
                        
                        {/* Timeline content */}
                        <div className="ml-4 flex-grow">
                          <div className={`p-6 rounded-2xl transition-all duration-500 ${
                            step.completed
                              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50'
                              : 'bg-gray-50 border border-gray-200/50'
                          }`}>
                            <h4 className={`font-semibold ${
                              step.completed ? 'text-blue-900' : 'text-gray-600'
                            }`}>
                              {step.label}
                            </h4>
                            {step.completed && (
                              <p className="text-sm text-blue-700 mt-1">
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
            )}

            {/* Tracking Events */}
            {trackingEvents.length > 0 && (
              <div className="card-glass animate-slide-up">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Tracking History</h3>
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
        )}
      </div>
    </Layout>
  );
};

export default TrackShipment;