import { createContext } from 'react';
import type { UserDataType } from '../../utils/types';

type AuthContextType = {
  user: UserDataType | null;
  auth: (userData: UserDataType) => void;
  cleanAuth: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  auth: () => {},
  cleanAuth: () => {},
});
