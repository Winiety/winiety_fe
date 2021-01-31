import { useAxios, apiEndpoints } from 'api';
import {
  Error,
  Complaint,
  ComplaintDetailResponse,
  ComplaintPostResponse,
  RequestParams,
} from 'api/types';
import { SimpleResponse, PagedData } from 'api/types/BaseResponse';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { displayNotification } from 'utils';

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
        .then((res) => {
          displayNotification('Zażalenie', 'Zażalenie dodano pomyślnie!');
          setComplaintData(res.data);
        })
        .catch((err) => {
          displayNotification(
            'Zażalenie',
            'Wystąpił błąd. Możliwe, że nie masz połączenia z internetem. Spróbujemy ponownie wykonać zapytanie po powrocie do stanu online'
          );
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

const useGetUserComplaints = (
  onError?: (error: AxiosError<Error>) => void
): [
  (params: RequestParams) => void,
  PagedData<ComplaintPostResponse> | null
] => {
  const axios = useAxios();
  const [complaints, setComplaints] = useState<PagedData<
    ComplaintPostResponse
  > | null>(null);

  const doGet = useCallback(
    (params: RequestParams) => {
      axios
        .get<PagedData<ComplaintPostResponse>>(
          `${apiEndpoints.fines}/complaint/user`,
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

const useDeleteComplaint = (
  onError?: (error: AxiosError<Error>) => void
): ((id: number) => Promise<SimpleResponse | undefined>) => {
  const axios = useAxios();

  const doDelete = useCallback(
    async (id: number) => {
      try {
        const data = await axios.delete<SimpleResponse>(
          `${apiEndpoints.fines}/complaint/${id}`
        );
        return data.data;
      } catch (error) {
        if (onError) onError(error);
      }
      return undefined;
    },
    [axios, onError]
  );

  return doDelete;
};

export default {
  usePostComplaint,
  useGetAllComplaints,
  useGetUserComplaints,
  useDeleteComplaint,
};
