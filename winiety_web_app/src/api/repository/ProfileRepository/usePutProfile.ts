import { Profile, Error } from 'api/types';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useAxios, apiEndpoints } from 'api';
import { displayNotification } from 'utils';

const usePutProfile = (
  onError?: (error: AxiosError<Error>) => void,
  onCompleted?: (data: Profile) => void
): ((arg0: Profile) => Promise<void>) => {
  const axios = useAxios();

  const putProfile = useCallback(
    async (profile: Profile) => {
      try {
        const { data } = await axios.put<Profile>(
          `${apiEndpoints.profile}/profile`,
          profile
        );
        displayNotification('Profil', 'Profil zaktualizowano pomyślnie!');
        if (onCompleted) onCompleted(data);
      } catch (error) {
        displayNotification(
          'Profil',
          'Wystąpił błąd. Możliwe, że nie masz połączenia z internetem. Spróbujemy ponownie wykonać zapytanie po powrocie do stanu online'
        );
        if (onError) onError(error);
      }
    },
    [axios, onCompleted, onError]
  );

  return putProfile;
};

export default usePutProfile;
