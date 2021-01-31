import { UserCar, Error } from 'api/types';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useAxios, apiEndpoints } from 'api';
import { displayNotification } from 'utils';

const useAddCar = (
  onError?: (error: AxiosError<Error>) => void,
  onCompleted?: (data: UserCar) => void
): ((arg0: Omit<UserCar, 'id'>) => Promise<void>) => {
  const axios = useAxios();

  const postCar = useCallback(
    async (car: Omit<UserCar, 'id'>) => {
      try {
        const { data } = await axios.post<UserCar>(
          `${apiEndpoints.profile}/car`,
          car
        );
        displayNotification('Samochód', 'Samochód dodano pomyślnie!');
        if (onCompleted) onCompleted(data);
      } catch (error) {
        displayNotification(
          'Samochód',
          'Wystąpił błąd. Możliwe, że nie masz połączenia z internetem. Spróbujemy ponownie wykonać zapytanie po powrocie do stanu online'
        );
        if (onError) onError(error);
      }
    },
    [axios, onCompleted, onError]
  );

  return postCar;
};

export default useAddCar;
