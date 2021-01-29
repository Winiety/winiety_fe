export interface Complaint {
  rideId: number;
  description: string;
}

export interface ComplaintPostResponse extends Complaint {
  id: number;
  pictureId: number;
  plateNumber: string;
  createTime: string;
}

export interface ComplaintDetailResponse extends ComplaintPostResponse {
  userId: number;
}
