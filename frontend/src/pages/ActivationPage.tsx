import React, { useEffect } from 'react';
import { activateSchema } from '../utils/zod.schemas';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import { type ApiErrorType } from '../api/normalizeError';
import { activateUser } from '../api/auth';
import { useError } from '../hooks/useError';
import { saveAccessToken } from '../utils/helpers';

const ActivationPage: React.FC = () => {
  const { error, setError } = useError();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const activateAccount = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setError({ type: 'token', message: 'Activation token is missing' });
        return;
      }

      const parseResult = activateSchema.safeParse({ token });

      if (!parseResult.success) {
        setError({ type: 'token', message: parseResult.error.message });
        return;
      }

      const { data, err } = await activateUser({ token });

      if (err) {
        setError(err);
        return;
      }

      if (!data) {
        return;
      }

      saveAccessToken(data.accessToken);

      navigate('/', { replace: true });
    };

    activateAccount();
  }, []);

  return (
    <section>
      {error ? <p>{error.message}</p> : <p>Activating your account...</p>}
    </section>
  );
};

export default ActivationPage;
