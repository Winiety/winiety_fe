/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { useStoreState } from 'store';
import { BaseResponse, MultiBaseResponse } from 'api/types';
import { useMemo } from 'react';

const serverOrigin = process.env.REACT_APP_SERVER_ORIGIN;

const gatewayPort = process.env.REACT_APP_API_GATEWAY_PORT;

const gatewayBasePath = process.env.REACT_APP_API_BASE_PATH;

export const apiUrl = `${serverOrigin}:${gatewayPort}${gatewayBasePath}`;

export const useAxios = (): AxiosInstance => {
  const authToken = useStoreState((store) => store.userSession.accessToken);
  const instance = useMemo(
    () =>
      axios.create({
        baseURL: apiUrl,
        responseType: 'json',
        headers: { Authorization: `Bearer ${authToken}` },
      }),
    [authToken]
  );

  instance.interceptors.response.use(
    async (response) => {
      if (response.data?.result) {
        const res = response as AxiosResponse<BaseResponse<any>>;
        res.data = res.data.result;
        return res;
      }
      if (response.data && response.data.results && !response.data.totalPages) {
        const res = response as AxiosResponse<MultiBaseResponse<any>>;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        res.data = res.data.results;
        return res;
      }
      return response;
    },
    (error) => {
      const err = error as AxiosError<any>;
      if (err.response) {
        err.response.data = err.response.data?.errors;
      }
      return Promise.reject(err);
    }
  );

  return instance;
};
