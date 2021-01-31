import { Error, Statistic } from 'api/types';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useAxios, apiEndpoints } from 'api';

interface GetStatisticsParams {
  dateFrom?: string;
  dateTo?: string;
  query?: string;
}

const useGetStatistics = (
  onError?: (error: AxiosError<Error>) => void
): [
  Statistic | null | undefined,
  (params: GetStatisticsParams) => void,
  boolean
] => {
  const axios = useAxios();
  const [statistics, setStatistics] = useState<Statistic | null | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(
    (params: GetStatisticsParams) => {
      setIsLoading(true);
      axios
        .get<Statistic>(`${apiEndpoints.statistics}/statistics/chart`, {
          params,
        })
        .then(({ data }) => {
          setIsLoading(false);

          setStatistics(data);
        })
        .catch((err) => {
          setIsLoading(false);

          if (onError) onError(err);
          setStatistics(null);
        });
    },
    [axios, onError]
  );

  return [statistics, fetchData, isLoading];
};

export default useGetStatistics;
