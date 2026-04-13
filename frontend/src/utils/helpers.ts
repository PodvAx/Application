import { format, parseISO } from 'date-fns';

const ACCESS_TOKEN_KEY = 'accessToken';

export const saveAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const clearAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const formatDate = (dateString: string) => {
  return format(parseISO(dateString), 'MMM d, yyyy');
};

export const formatTime = (dateString: string) => {
  return format(parseISO(dateString), 'hh : mm');
};
