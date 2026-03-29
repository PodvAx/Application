import { useState } from 'react';
import type { ApiErrorType } from '../../api/normalizeError';
import { ErrorContext } from './ErrorContext';

type Props = {
  children: React.ReactNode;
};

export const ErrorProvider: React.FC<Props> = ({ children }) => {
  const [error, setError] = useState<ApiErrorType | null>(null);

  const cleanError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, setError, cleanError }}>
      {children}
    </ErrorContext.Provider>
  );
};
