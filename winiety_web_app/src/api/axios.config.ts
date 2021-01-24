/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { useStoreState } from 'store';
import { BaseResponse } from 'types';

const serverOrigin = process.env.REACT_APP_SERVER_ORIGIN;

const gatewayPort = process.env.REACT_APP_API_GATEWAY_PORT;

const gatewayBasePath = process.env.REACT_APP_API_BASE_PATH;

export const apiUrl = `${serverOrigin}:${gatewayPort}${gatewayBasePath}`;

export const useAxios = (): AxiosInstance => {
  const authToken = useStoreState((store) => store.userSession.accessToken);
  const instance = axios.create({
    baseURL: apiUrl,
    responseType: 'json',
    headers: { Authorization: `Bearer ${authToken}` },
  });

  instance.interceptors.response.use(
    async (response) => {
      const res = response as AxiosResponse<BaseResponse<any>>;
      res.data = res.data.result;
      return res;
    },
    (error) => {
      const err = error;
      if (err.response) {
        err.response.data = err.response.data.errors;
      }
      return Promise.reject(err);
    }
  );

  return instance;
};
