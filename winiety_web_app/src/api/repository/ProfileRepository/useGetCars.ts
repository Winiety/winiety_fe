import { UserCar, Error } from 'api/types';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAxios, apiEndpoints } from 'api';

const useGetProfile = (
  onError?: (error: AxiosError<Error>) => void
): [
  UserCar[] | null | undefined,
  (car: UserCar) => void,
  (id: number) => void
] => {
  const axios = useAxios();
  const [cars, setCars] = useState<UserCar[] | null | undefined>(undefined);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get<UserCar[]>(
        `${apiEndpoints.profile}/car`
      );
      setCars(data);
      return data;
    } catch (error) {
      if (onError) onError(error);
      setCars(null);
    }
    return null;
  }, [axios, onError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateCar = useCallback((car: UserCar) => {
    setCars((prev) => {
      if (!prev) return [car];
      const existing = prev.findIndex((e) => e.id === car.id);
      if (existing === -1) return [...prev, car];
      const newCars = prev.slice();
      newCars[existing] = car;
      return newCars;
    });
  }, []);

  const deleteCar = useCallback((id: number) => {
    setCars((prev) => {
      if (!prev) return prev;
      return prev.filter((e) => e.id !== id);
    });
  }, []);

  return [cars, updateCar, deleteCar];
};

export default useGetProfile;
