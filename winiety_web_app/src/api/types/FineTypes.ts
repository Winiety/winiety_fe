export interface Fine {
  rideId: number;
  cost: number;
  description: string;
}

export interface FinePostResponse extends Fine {
  id: number;
  pictureId: number;
  plateNumber: string;
  createTime: string;
}

export interface FineDetailResponse extends FinePostResponse {
  userId: number;
}
