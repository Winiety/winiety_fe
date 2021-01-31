import { useAxios, apiEndpoints } from 'api';
import { Error, Picture, PostPicture, RequestParams } from 'api/types';
import { SimpleResponse, PagedData } from 'api/types/BaseResponse';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

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

const useGetAllNotRecognizedPictures = (
  onError?: (error: AxiosError<Error>) => void
): [(params: RequestParams) => void, PagedData<Picture> | null] => {
  const axios = useAxios();
  const [pictures, setPictures] = useState<PagedData<Picture> | null>(null);

  const doGet = useCallback(
    (params: RequestParams) => {
      axios
        .get<PagedData<Picture>>(
          `${apiEndpoints.pictures}/pictures/not-recognized`,
          {
            params,
          }
        )
        .then(({ data }) => {
          setPictures(data);
        })
        .catch((err) => {
          if (onError) onError(err);
        });
    },
    [axios, onError]
  );

  return [doGet, pictures];
};

const usePostPictureAnalysis = (
  onError?: (error: AxiosError<Error>) => void
): [(bodyData: PostPicture) => void, SimpleResponse | null] => {
  const axios = useAxios();
  const [response, setResponse] = useState<SimpleResponse | null>(null);

  const doPost = useCallback(
    (data: PostPicture) => {
      axios
        .post<SimpleResponse>(
          `${apiEndpoints.pictures}/pictures/analyze-picture`,
          data
        )
        .then((res) => setResponse(res.data))
        .catch((err) => {
          if (onError) onError(err);
        });
    },
    [axios, onError]
  );

  return [doPost, response];
};

export default {
  useGetPicturePath,
  useGetAllNotRecognizedPictures,
  usePostPictureAnalysis,
};
