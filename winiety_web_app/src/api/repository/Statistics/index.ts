import { useAxios, apiEndpoints } from 'api';
import { Error, StatisticsRequest } from 'api/types';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import useGetStatistics from './useGetStatistics';

const useGetCsvFile = (
  onError?: (error: AxiosError<Error>) => void
): ((params: StatisticsRequest) => void) => {
  const axios = useAxios();

  const doGet = useCallback(
    (params: StatisticsRequest) => {
      axios
        .get(`${apiEndpoints.statistics}/statistics/csv`, {
          params,
          responseType: 'blob',
        })
        .then(({ data, request }) => {
          const href = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement('a');
          link.href = href;
          link.setAttribute(
            'download',
            request.getResponseHeader('Content-Disposition') || 'statistics.csv'
          );
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          if (onError) onError(err);
        });
    },
    [axios, onError]
  );

  return doGet;
};

const useGetJsonFile = (
  onError?: (error: AxiosError<Error>) => void
): ((params: StatisticsRequest) => void) => {
  const axios = useAxios();

  const doGet = useCallback(
    (params: StatisticsRequest) => {
      axios
        .get(`${apiEndpoints.statistics}/statistics/json`, {
          params,
          responseType: 'blob',
        })
        .then(({ data, request }) => {
          const href = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement('a');
          link.href = href;
          link.setAttribute(
            'download',
            request.getResponseHeader('Content-Disposition') ||
              'statistics.json'
          );
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          if (onError) onError(err);
        });
    },
    [axios, onError]
  );

  return doGet;
};

export default {
  useGetCsvFile,
  useGetJsonFile,
  useGetStatistics,
};
