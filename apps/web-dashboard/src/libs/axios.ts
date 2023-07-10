import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
} from 'axios';

import { auth0Client } from './auth0-client';

const BASE_URL = 'http://localhost:8000/api';

const instanceWithAuth = axios.create({ baseURL: BASE_URL });
const instanceWithoutAuth = axios.create({ baseURL: BASE_URL });

const withAuthHeader = async <T, R extends AxiosResponse<T> = AxiosResponse<T>>(
  cb: (headers?: { Authorization: string }) => Promise<R>,
): Promise<R> => {
  const accessToken = await auth0Client.getTokenSilently();
  const headers = { Authorization: `Bearer ${accessToken}` };
  return cb(headers);
};

const withSelectData = async <
  T = unknown,
  R extends AxiosResponse<T> = AxiosResponse<T>,
>(
  cb: () => Promise<R>,
): Promise<R['data']> => {
  const response = await cb();
  return response.data;
};

const mergeHeadersAndConfig = <D = unknown>(
  headers: AxiosRequestConfig<D>['headers'],
  config?: AxiosRequestConfig<D>,
) => ({
  headers: { ...headers, ...config?.headers },
  ...config,
});

export const axiosWithAuth = {
  get: <
    T = unknown,
    R extends AxiosResponse<T> = AxiosResponse<T>,
    D = unknown,
  >(
    url: string,
    config?: AxiosRequestConfig<D>,
  ) =>
    withSelectData<T, R>(() =>
      withAuthHeader<T, R>((headers) =>
        instanceWithAuth.get<T, R, D>(
          url,
          mergeHeadersAndConfig(headers, config),
        ),
      ),
    ),
  post: <
    T = unknown,
    R extends AxiosResponse<T> = AxiosResponse<T>,
    D = unknown,
  >(
    url: string,
    data: D,
    config?: AxiosRequestConfig<D>,
  ) =>
    withSelectData<T, R>(() =>
      withAuthHeader<T, R>((headers) =>
        instanceWithAuth.post<T, R, D>(
          url,
          data,
          mergeHeadersAndConfig(headers, config),
        ),
      ),
    ),
  put: <
    T = unknown,
    R extends AxiosResponse<T> = AxiosResponse<T>,
    D = unknown,
  >(
    url: string,
    data: D,
    config?: AxiosRequestConfig<D>,
  ) =>
    withSelectData<T, R>(() =>
      withAuthHeader<T, R>((headers) =>
        instanceWithAuth.put<T, R, D>(
          url,
          data,
          mergeHeadersAndConfig(headers, config),
        ),
      ),
    ),
  patch: <
    T = unknown,
    R extends AxiosResponse<T> = AxiosResponse<T>,
    D = unknown,
  >(
    url: string,
    data: D,
    config?: AxiosRequestConfig<D>,
  ) =>
    withSelectData<T, R>(() =>
      withAuthHeader<T, R>((headers) =>
        instanceWithAuth.patch<T, R, D>(
          url,
          data,
          mergeHeadersAndConfig(headers, config),
        ),
      ),
    ),
  delete: <
    T = unknown,
    R extends AxiosResponse<T> = AxiosResponse<T>,
    D = unknown,
  >(
    url: string,
    config?: AxiosRequestConfig<D>,
  ) =>
    withSelectData<T, R>(() =>
      withAuthHeader<T, R>((headers) =>
        instanceWithAuth.delete<T, R>(
          url,
          mergeHeadersAndConfig(headers, config),
        ),
      ),
    ),
};

export const isNotFoundStatus = (error: AxiosError) =>
  error.response && error.response.status === HttpStatusCode.NotFound;

export const isUnauthorizedStatus = (error: AxiosError) =>
  error.response && error.response.status === HttpStatusCode.Unauthorized;

export const isForbiddenStatus = (error: AxiosError) =>
  error.response && error.response.status === HttpStatusCode.Forbidden;

export { instanceWithoutAuth as axiosWithoutAuth };
