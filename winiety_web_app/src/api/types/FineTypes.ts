export interface Fine {
  rideId: number;
  cost: number;
  description: string;
}

export interface FinePostResponse {
  id: number;
  rideId: number;
  pictureId: number;
  plateNumber: string;
  cost: number;
  description: string;
  createTime: string;
}
