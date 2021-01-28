import { useAxios, apiEndpoints } from 'api';
import { Error, Picture } from 'api/types';
import { AxiosError } from 'axios';
import { useCallback } from 'react';

const useGetPicturePath = (
  onError?: (error: AxiosError<Error>) => void
): ((id: number) => Promise<string | undefined>) => {
  const axios = useAxios();

  const doGet = useCallback(
    async (id: number) => {
      try {
        const {
          data: { imagePath },
        } = await axios.get<Picture>(`${apiEndpoints.pictures}/pictures/${id}`);
        return imagePath;
      } catch (error) {
        if (onError) onError(error);
      }
      return undefined;
    },
    [axios, onError]
  );

  return doGet;
};

export default { useGetPicturePath };
