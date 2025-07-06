export interface User {
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
  id: number;
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
  estimatedDelivery?: string;
  actualDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrackingEvent {
  id: number;
  shipmentId: number;
  status: string;
  location?: string;
  description?: string;
  timestamp: string;
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

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}
