export interface SearchRequest {
  pageSize: number;
  pageNumber: number;
  query?: string;
}

export interface RideSearchRequest extends SearchRequest {
  startDate?: string;
  endDate?: string;
  speedLimit?: number;
}
