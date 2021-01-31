import { useAxios, apiEndpoints } from 'api';
import { Error, Payment, PaymentRequest } from 'api/types';
import { PagedData } from 'api/types/BaseResponse';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

const useGetUserPayments = (
  onError?: (error: AxiosError<Error>) => void
): [(params: PaymentRequest) => void, PagedData<Payment> | null] => {
  const axios = useAxios();
  const [payments, setPayments] = useState<PagedData<Payment> | null>(null);

  const doGet = useCallback(
    (params: PaymentRequest) => {
      axios
        .get<PagedData<Payment>>(`${apiEndpoints.payment}/payment/user`, {
          params,
        })
        .then(({ data }) => {
          setPayments(data);
        })
        .catch((err) => {
          if (onError) onError(err);
        });
    },
    [axios, onError]
  );

  return [doGet, payments];
};

export default useGetUserPayments;
