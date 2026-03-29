import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import type { UserDataType } from '../../utils/types';
import { getMe } from '../../api/auth';
import { useError } from '../../hooks/useError';
import { getAccessToken } from '../../utils/helpers';

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserDataType | null>(null);
  const { setError } = useError();

  const auth = (userData: UserDataType) => {
    setUser(userData);
  };

  const cleanAuth = () => {
    setUser(null);
  };

  useEffect(() => {
    if (!getAccessToken()) {
      return;
    }

    getMe().then(({ data, err }) => {
      if (err) {
        setError(err);
        return;
      }

      if (!data) {
        return;
      }

      setUser(data);
    });
  }, [setError]);

  return (
    <AuthContext.Provider value={{ user, auth, cleanAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
