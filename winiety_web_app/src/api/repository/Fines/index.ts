import { useAxios, apiEndpoints } from 'api';
import { Error, Fine, FinePostResponse } from 'api/types';
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

export default { usePostFine };
