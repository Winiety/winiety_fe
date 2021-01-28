export interface NotificationKeyResponse {
  publicKey: string;
}

export interface NotificationSubscription {
  endpoint: string;
  p256dh: string;
  auth: string;
}
