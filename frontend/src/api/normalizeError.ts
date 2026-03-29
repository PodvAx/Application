import { isAxiosError } from 'axios';

export type ApiErrorType = {
  type: string;
  message: string;
  status?: number;
  statusText?: string;
  err?: unknown;
};

export const normalizeError = (err: unknown): ApiErrorType => {
  if (!isAxiosError(err)) {
    return {
      type: 'api',
      message: 'Unknown error',
      err: err,
    };
  }

  console.log('normalizeError');
  console.log('err.message', err.message);
  console.log('err.status', err.status);
  console.log('err.code', err.code);
  console.log('err.request', err.request);
  console.log('err.response', err.response);
  console.log('err.response.config', err.response?.config);
  console.log('err.response.headers', err.response?.headers);
  console.log('err.response.data', err.response?.data);

  if (!err.response) {
    return {
      type: 'network',
      message: 'Server is not available. Try again later!',
      err: err,
    };
  }

  return {
    type: 'api',
    status: err.response.status,
    statusText: err.response.statusText,
    message: err.response.data?.message || 'Something went wrong',
    err: err,
  };
};
