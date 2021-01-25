export interface BaseResponse<T> {
  isSuccess: boolean;
  errors: Error[];
  result: T;
}

export interface Error {
  message: string;
}
