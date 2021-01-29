import { useAxios, apiEndpoints } from 'api';
import {
  Error,
  Fine,
  FineDetailResponse,
  FinePostResponse,
  RequestParams,
} from 'api/types';
import { PagedData } from 'api/types/BaseResponse';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

const usePostFine = (
  onError?: (error: AxiosError<Error>) => void
): [(bodyData: Fine) => void, FinePostResponse | null] => {
  const axios = useAxios();
  const [fineData, setFineData] = useState<FinePostResponse | null>(null);

  const doPost = useCallback(
    (data: Fine) => {
      axios
        .post<FinePostResponse>(`${apiEndpoints.fines}/fine`, data)
        .then((res) => setFineData(res.data))
        .catch((err) => {
          if (onError) onError(err);
        });
    },
    [axios, onError]
  );

  return [doPost, fineData];
};

const useGetAllFines = (
  onError?: (error: AxiosError<Error>) => void
): [(params: RequestParams) => void, PagedData<FineDetailResponse> | null] => {
  const axios = useAxios();
  const [fines, setFines] = useState<PagedData<FineDetailResponse> | null>(
    null
  );

  const doGet = useCallback(
    (params: RequestParams) => {
      axios
        .get<PagedData<FineDetailResponse>>(`${apiEndpoints.fines}/fine`, {
          params,
        })
        .then(({ data }) => {
          setFines(data);
        })
        .catch((err) => {
          if (onError) onError(err);
        });
    },
    [axios, onError]
  );

  return [doGet, fines];
};

const useGetUserFines = (
  onError?: (error: AxiosError<Error>) => void
): [(params: RequestParams) => void, PagedData<FinePostResponse> | null] => {
  const axios = useAxios();
  const [fines, setFines] = useState<PagedData<FinePostResponse> | null>(null);

  const doGet = useCallback(
    (params: RequestParams) => {
      axios
        .get<PagedData<FinePostResponse>>(`${apiEndpoints.fines}/fine/user`, {
          params,
        })
        .then(({ data }) => {
          setFines(data);
        })
        .catch((err) => {
          if (onError) onError(err);
        });
    },
    [axios, onError]
  );

  return [doGet, fines];
};

export default { usePostFine, useGetAllFines, useGetUserFines };
