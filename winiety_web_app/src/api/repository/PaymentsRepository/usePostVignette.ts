import { useAxios, apiEndpoints } from 'api';
import { Error, Vignette, VignetteRequest } from 'api/types';
import { BaseResponse } from 'api/types/BaseResponse';
import { AxiosError } from 'axios';
import { useCallback } from 'react';

const usePostVignette = (
  onError?: (error: AxiosError<Error>) => void
): ((bodyData: VignetteRequest) => Promise<string | undefined>) => {
  const axios = useAxios();

  const doPost = useCallback(
    async (bodyData: VignetteRequest) => {
      try {
        const { data } = await axios.post<Vignette>(
          `${apiEndpoints.payment}/payment/winieta/pay`,
          undefined,
          { params: bodyData }
        );
        console.log(data);

        return data.payuUrl;
      } catch (error) {
        if (onError) onError(error);
      }
      return undefined;
    },
    [axios, onError]
  );

  return doPost;
};

export default usePostVignette;
