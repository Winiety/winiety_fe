import { useAxios, apiEndpoints } from 'api';
import { Error, Payment, PayRequest } from 'api/types';
import { BaseResponse } from 'api/types/BaseResponse';
import { AxiosError } from 'axios';
import { useCallback } from 'react';

const usePostPayment = (
  onError?: (error: AxiosError<Error>) => void
): ((bodyData: PayRequest) => Promise<string | undefined>) => {
  const axios = useAxios();

  const doPost = useCallback(
    async (bodyData: PayRequest) => {
      try {
        const { data } = await axios.post<Payment>(
          `${apiEndpoints.payment}/payment/pay`,
          bodyData
        );
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

export default usePostPayment;
