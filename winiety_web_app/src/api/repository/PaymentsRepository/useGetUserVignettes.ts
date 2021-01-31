import { useAxios, apiEndpoints } from 'api';
import { Error, Vignette } from 'api/types';
import { PagedData } from 'api/types/BaseResponse';
import { SearchRequest } from 'api/types/RequestParams';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

const useGetUserVignettes = (
  onError?: (error: AxiosError<Error>) => void
): [(params: SearchRequest) => void, PagedData<Vignette> | null] => {
  const axios = useAxios();
  const [vignettes, setVignettes] = useState<PagedData<Vignette> | null>(null);

  const doGet = useCallback(
    (params: SearchRequest) => {
      axios
        .get<PagedData<Vignette>>(
          `${apiEndpoints.payment}/payment/winieta/user`,
          {
            params,
          }
        )
        .then(({ data }) => {
          setVignettes(data);
        })
        .catch((err) => {
          if (onError) onError(err);
        });
    },
    [axios, onError]
  );

  return [doGet, vignettes];
};

export default useGetUserVignettes;
