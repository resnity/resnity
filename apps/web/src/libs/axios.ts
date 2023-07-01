import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { auth0Client } from '../modules/auth/clients/auth0.client';

const instanceWithAuth = axios.create();
const instanceWithoutAuth = axios.create();

const withAuthHeader = async <R>(
  cb: (headers?: { Authorization: string }) => Promise<R>,
): Promise<R> => {
  const accessToken = await auth0Client.getTokenSilently();
  const headers = { Authorization: `Bearer ${accessToken}` };
  return cb(headers);
};

const mergeHeadersAndConfig = <D = unknown>(
  headers: AxiosRequestConfig<D>['headers'],
  config?: AxiosRequestConfig<D>,
) => ({
  headers: { ...headers, ...config?.headers },
  ...config,
});

export const axiosWithAuth = {
  get: <T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ) =>
    withAuthHeader((headers) =>
      instanceWithAuth.get<T, R, D>(
        url,
        mergeHeadersAndConfig(headers, config),
      ),
    ),
  post: <T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig<D>,
  ) =>
    withAuthHeader((headers) =>
      instanceWithAuth.post<T, R, D>(
        url,
        data,
        mergeHeadersAndConfig(headers, config),
      ),
    ),
  put: <T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig<D>,
  ) =>
    withAuthHeader((headers) =>
      instanceWithAuth.post<T, R, D>(
        url,
        data,
        mergeHeadersAndConfig(headers, config),
      ),
    ),
  patch: <T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig<D>,
  ) =>
    withAuthHeader((headers) =>
      instanceWithAuth.post<T, R, D>(
        url,
        data,
        mergeHeadersAndConfig(headers, config),
      ),
    ),
  delete: <T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ) =>
    withAuthHeader((headers) =>
      instanceWithAuth.get<T, R, D>(
        url,
        mergeHeadersAndConfig(headers, config),
      ),
    ),
};

export { instanceWithoutAuth as axiosWithoutAuth };
