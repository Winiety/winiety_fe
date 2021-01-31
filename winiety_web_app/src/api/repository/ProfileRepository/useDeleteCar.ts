import { Error } from 'api/types';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useAxios, apiEndpoints } from 'api';
import { displayNotification } from 'utils';

const useDeleteCar = (
  onError?: (error: AxiosError<Error>) => void,
  onCompleted?: (id: number) => void
): ((id: number) => void) => {
  const axios = useAxios();

  const deleteCar = useCallback(
    (id: number) => {
      axios
        .delete(`${apiEndpoints.profile}/car/${id}`)
        .then(() => {
          displayNotification('Samochód', 'Samochód usunięto pomyślnie!');
          if (onCompleted) onCompleted(id);
        })
        .catch((err) => {
          displayNotification(
            'Samochód',
            'Wystąpił błąd. Możliwe, że nie masz połączenia z internetem. Spróbujemy ponownie wykonać zapytanie po powrocie do stanu online'
          );
          if (onError) onError(err);
        });
    },
    [axios, onCompleted, onError]
  );

  return deleteCar;
};

export default useDeleteCar;
