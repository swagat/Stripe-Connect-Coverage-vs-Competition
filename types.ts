
export type GatewayId = 'paypal' | 'razorpay' | 'checkout' | 'adyen';

export interface GatewayData {
  id: GatewayId;
  name: string;
  description: string;
  countries: string[];
  color: string;
  strategicValue: string;
}

export interface MapState {
  selectedGateway: GatewayId;
  isMapLoaded: boolean;
}
