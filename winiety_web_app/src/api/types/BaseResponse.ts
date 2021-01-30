export interface BaseResponse<T> {
  isSuccess: boolean;
  errors: Error[];
  result: T;
}

export interface PagedData<T> {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  results: T[];
}

export interface BasePageResponse<T> extends PagedData<T> {
  isSuccess: boolean;
  errors: Error[];
}

export interface SimpleResponse {
  isSuccess: boolean;
  errors: Error[];
}

export interface Error {
  message: string;
}
