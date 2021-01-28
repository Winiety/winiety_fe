import { useAxios, apiEndpoints } from 'api';
import { Error, RideSearchRequest } from 'api/types';
import { PagedData } from 'api/types/BaseResponse';
import { DetailedRide, UserRide } from 'api/types/RideTypes';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

const useGetAllRides = (
  onError?: (error: AxiosError<Error>) => void
): [(params: RideSearchRequest) => void, PagedData<DetailedRide> | null] => {
  const axios = useAxios();
  const [rides, setRides] = useState<PagedData<DetailedRide> | null>(null);

  const doGet = useCallback(
    (params: RideSearchRequest) => {
      axios
        .get<PagedData<DetailedRide>>(`${apiEndpoints.rides}/ride`, {
          params,
        })
        .then(({ data }) => {
          setRides(data);
        })
        .catch((err) => {
          if (onError) onError(err);
        });
    },
    [axios, onError]
  );

  return [doGet, rides];
};

const useGetUserRides = (
  onError?: (error: AxiosError<Error>) => void
): [(params: RideSearchRequest) => void, PagedData<UserRide> | null] => {
  const axios = useAxios();
  const [rides, setRides] = useState<PagedData<UserRide> | null>(null);

  const doGet = useCallback(
    (params: RideSearchRequest) => {
      axios
        .get<PagedData<UserRide>>(`${apiEndpoints.rides}/ride/user`, {
          params,
        })
        .then(({ data }) => {
          setRides(data);
        })
        .catch((err) => {
          if (onError) onError(err);
        });
    },
    [axios, onError]
  );

  return [doGet, rides];
};

export default { useGetAllRides, useGetUserRides };
