import { createContext } from 'react';
import type { ApiErrorType } from '../../api/normalizeError';

type ErrorContextType = {
  error: ApiErrorType | null;
  setError: (err: ApiErrorType) => void;
  cleanError: () => void;
};

export const ErrorContext = createContext<ErrorContextType>({
  error: null,
  setError: () => {},
  cleanError: () => {},
});
