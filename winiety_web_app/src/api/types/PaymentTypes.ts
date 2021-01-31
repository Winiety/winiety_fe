export interface Payment {
  id: number;
  rideId: number;
  status: string;
  amount: number;
  payuUrl: string;
}

export interface VignetteRequest {
  continueUrl: string;
}

export interface PayRequest extends VignetteRequest {
  paymentId: number;
}

export interface Vignette {
  id: number;
  paymentStatus: string;
  payuUrl: string;
  cost: number;
  expirationDate: string;
  isActive: boolean;
}
