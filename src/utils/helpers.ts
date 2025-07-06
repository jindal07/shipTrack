import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'shipment-status-pending';
    case 'picked-up':
    case 'in-transit':
    case 'out-for-delivery':
      return 'shipment-status-in-transit';
    case 'delivered':
      return 'shipment-status-delivered';
    case 'cancelled':
      return 'shipment-status-cancelled';
    default:
      return 'shipment-status-pending';
  }
};

export const getStatusText = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'picked-up':
      return 'Picked Up';
    case 'in-transit':
      return 'In Transit';
    case 'out-for-delivery':
      return 'Out for Delivery';
    case 'delivered':
      return 'Delivered';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status;
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};
