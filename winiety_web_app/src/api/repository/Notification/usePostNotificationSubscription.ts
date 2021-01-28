import { useAxios, apiEndpoints } from 'api';
import { NotificationSubscription } from 'api/types';
import { AxiosError } from 'axios';
import { useCallback } from 'react';

const usePostNotificationSubscription = (
  onError?: (error: AxiosError<Error>) => void
): ((data: NotificationSubscription) => Promise<void>) => {
  const axios = useAxios();
  const postSubscription = useCallback(
    async (data: NotificationSubscription) => {
      try {
        await axios.post<NotificationSubscription>(
          `${apiEndpoints.notification}/notification/register`,
          data
        );
      } catch (error) {
        if (onError) onError(error);
      }
    },
    [axios, onError]
  );
  return postSubscription;
};

export default usePostNotificationSubscription;
