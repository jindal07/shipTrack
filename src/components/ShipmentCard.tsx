import React from 'react';
import type { Shipment } from '../types';
import { getStatusColor, getStatusText, formatDate } from '../utils/helpers';
import { Package, MapPin, User, ArrowRight, Clock } from 'lucide-react';

interface ShipmentCardProps {
  shipment: Shipment;
  onClick?: () => void;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({ shipment, onClick }) => {
  return (
    <div 
      className="card hover-lift hover-glow cursor-pointer group animate-scale-in"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-2xl">
              <Package className="h-5 w-5 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              {shipment.trackingNumber}
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              {formatDate(shipment.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={getStatusColor(shipment.status)}>
            {getStatusText(shipment.status)}
          </span>
          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sender Info */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">From</span>
          </div>
          <div className="pl-4 space-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-400" />
              <span className="font-semibold text-gray-900">{shipment.senderName}</span>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
              <span className="text-sm text-gray-600 leading-relaxed line-clamp-2">{shipment.senderAddress}</span>
            </div>
          </div>
        </div>

        {/* Receiver Info */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">To</span>
          </div>
          <div className="pl-4 space-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-400" />
              <span className="font-semibold text-gray-900">{shipment.receiverName}</span>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
              <span className="text-sm text-gray-600 leading-relaxed line-clamp-2">{shipment.receiverAddress}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-gray-100/60">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <span className="font-medium capitalize">{shipment.packageSize}</span>
            </div>
            {shipment.weight && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                <span className="font-medium">{shipment.weight}kg</span>
              </div>
            )}
          </div>
          
          {shipment.estimatedDelivery && (
            <div className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-semibold">
                Est: {formatDate(shipment.estimatedDelivery)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default ShipmentCard;
