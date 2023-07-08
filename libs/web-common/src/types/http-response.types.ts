export type SuccessHttpResponse<T> = {
  data: T;
  timestamp: string;
  message?: string;
  status?: number;
};
