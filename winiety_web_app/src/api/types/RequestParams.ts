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

export interface StatisticsRequest {
  dateFrom?: string;
  dateTo?: string;
  groupBy?: string;
}

export interface PaymentRequest extends SearchRequest {
  status?: string;
}
