import { useAxios, apiEndpoints } from 'api';
import { NotificationKeyResponse } from 'api/types';
import { AxiosError } from 'axios';
import { useCallback } from 'react';

const useGetKeyLazy = (
  onError?: (error: AxiosError<Error>) => void
): (() => Promise<string | undefined>) => {
  const axios = useAxios();
  const getKey = useCallback(async () => {
    try {
      const {
        data: { publicKey },
      } = await axios.get<NotificationKeyResponse>(
        `${apiEndpoints.notification}/notification/key`
      );
      return publicKey;
    } catch (error) {
      if (onError) onError(error);
    }
    return undefined;
  }, [axios, onError]);
  return getKey;
};

export default useGetKeyLazy;
