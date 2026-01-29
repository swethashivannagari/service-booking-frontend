export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  providerId: string;
  providerName: string;
  scheduledTime: string;
  status: 'REQUESTED' | 'ACCEPTED' | 'COMPLETED' | 'CANCELLED';
}
