import { Profile, Error } from 'api/types';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useAxios, apiEndpoints } from 'api';
import { displayNotification } from 'utils';

const usePutProfile = (
  onError?: (error: AxiosError<Error>) => void,
  onCompleted?: () => void
): ((arg0: Profile) => Promise<void>) => {
  const axios = useAxios();

  const putProfile = useCallback(
    async (profile: Profile) => {
      try {
        await axios.put(`${apiEndpoints.profile}/profile`, profile);
        displayNotification('Profil', 'Profil zaktualizowano pomyślnie!');
        if (onCompleted) onCompleted();
      } catch (error) {
        if (onError) onError(error);
      }
    },
    [axios, onCompleted, onError]
  );

  return putProfile;
};

export default usePutProfile;
