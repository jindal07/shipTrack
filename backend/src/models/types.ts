export interface User {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Shipment {
  id?: number;
  trackingNumber: string;
  userId: number;
  senderName: string;
  senderAddress: string;
  senderPhone?: string;
  receiverName: string;
  receiverAddress: string;
  receiverPhone?: string;
  packageSize: 'small' | 'medium' | 'large' | 'extra-large';
  weight?: number;
  description?: string;
  status: 'pending' | 'picked-up' | 'in-transit' | 'out-for-delivery' | 'delivered' | 'cancelled';
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TrackingEvent {
  id?: number;
  shipmentId: number;
  status: string;
  location?: string;
  description?: string;
  timestamp: Date;
}

export interface CreateShipmentRequest {
  senderName: string;
  senderAddress: string;
  senderPhone?: string;
  receiverName: string;
  receiverAddress: string;
  receiverPhone?: string;
  packageSize: 'small' | 'medium' | 'large' | 'extra-large';
  weight?: number;
  description?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
}
