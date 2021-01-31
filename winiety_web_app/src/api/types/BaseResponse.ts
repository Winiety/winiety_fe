export interface BaseResponse<T> {
  isSuccess: boolean;
  errors: Error[];
  result: T;
}

export interface MultiBaseResponse<T> {
  isSuccess: boolean;
  errors: Error[];
  results: T[];
}

export interface PagedData<T> {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  results: T[];
}

export type BasePageResponse<T> = PagedData<T> & MultiBaseResponse<T>;

export interface SimpleResponse {
  isSuccess: boolean;
  errors: Error[];
}

export interface Error {
  message: string;
}
