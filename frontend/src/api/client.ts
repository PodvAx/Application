import axios from 'axios';
import { normalizeError } from './normalizeError';
import {
  clearAccessToken,
  getAccessToken,
  saveAccessToken,
} from '../utils/helpers';

import { refresh } from './auth';

export const API_URL = 'http://localhost:4200/api';

export const apiClientPublic = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const apiClientPrivate = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

apiClientPublic.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    throw normalizeError(err);
  },
);

apiClientPrivate.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const normalizedError = normalizeError(err);

    if (normalizedError.type === 'api' && normalizedError.status === 401) {
      const { data, err: error } = await refresh();

      if (error) {
        clearAccessToken();
        throw error;
      }

      if (data) {
        saveAccessToken(data.accessToken);

        // Retry the original request
        const originalRequest = err.config;
        return apiClientPrivate.request(originalRequest);
      }
    }

    throw normalizedError;
  },
);

apiClientPrivate.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});
