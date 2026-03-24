import axios from 'axios';

export const getErrorMessage = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data || err.message || 'Request failed';
  }

  return 'Unexpected error';
};
