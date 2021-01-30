import { Error } from 'api/types';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useAxios, apiEndpoints } from 'api';
import { displayNotification } from 'utils';

const useDeleteCar = (
  onError?: (error: AxiosError<Error>) => void,
  onCompleted?: (id: number) => void
): ((id: number) => Promise<void>) => {
  const axios = useAxios();

  const deleteCar = useCallback(
    async (id: number) => {
      try {
        await axios.delete(`${apiEndpoints.profile}/car/${id}`);
        displayNotification('Samochód', 'Samochód usunięto pomyślnie!');
        if (onCompleted) onCompleted(id);
      } catch (error) {
        if (onError) onError(error);
      }
    },
    [axios, onCompleted, onError]
  );

  return deleteCar;
};

export default useDeleteCar;
