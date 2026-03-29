import { useContext } from 'react';
import { ErrorContext } from '../context/error/ErrorContext';

export const useError = () => {
  return useContext(ErrorContext);
};
