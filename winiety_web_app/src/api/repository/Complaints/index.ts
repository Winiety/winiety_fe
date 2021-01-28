import { useAxios, apiEndpoints } from 'api';
import {
  Error,
  Complaint,
  ComplaintDetailResponse,
  ComplaintPostResponse,
  RequestParams,
} from 'api/types';
import { PagedData } from 'api/types/BaseResponse';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

const usePostComplaint = (
  onError?: (error: AxiosError<Error>) => void
): [(bodyData: Complaint) => void, ComplaintPostResponse | null] => {
  const axios = useAxios();
  const [
    complaintData,
    setComplaintData,
  ] = useState<ComplaintPostResponse | null>(null);

  const doPost = useCallback(
    (data: Complaint) => {
      axios
        .post<ComplaintPostResponse>(`${apiEndpoints.fines}/complaint`, data)
        .then((res) => setComplaintData(res.data))
        .catch((err) => {
          if (onError) onError(err);
        });
    },
    [axios, onError]
  );

  return [doPost, complaintData];
};

const useGetAllComplaints = (
  onError?: (error: AxiosError<Error>) => void
): [
  (params: RequestParams) => void,
  PagedData<ComplaintDetailResponse> | null
] => {
  const axios = useAxios();
  const [complaints, setComplaints] = useState<PagedData<
    ComplaintDetailResponse
  > | null>(null);

  const doGet = useCallback(
    (params: RequestParams) => {
      axios
        .get<PagedData<ComplaintDetailResponse>>(
          `${apiEndpoints.fines}/complaint`,
          {
            params,
          }
        )
        .then(({ data }) => {
          setComplaints(data);
        })
        .catch((err) => {
          if (onError) onError(err);
        });
    },
    [axios, onError]
  );

  return [doGet, complaints];
};

export default { usePostComplaint, useGetAllComplaints };
