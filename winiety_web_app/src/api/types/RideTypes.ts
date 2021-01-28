export interface UserRide {
  id: number;
  pictureId: number;
  plateNumber: string;
  rideDateTime: string;
  speed: number;
}

export interface DetailedRide extends UserRide {
  userId: number;
}
