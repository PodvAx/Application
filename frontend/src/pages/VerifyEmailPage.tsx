import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import type { UserRegisterDataType } from '../utils/types';
import { registerUser } from '../api/auth';
// import ErrorMessage from '../components/ErrorMessage';
import { useError } from '../hooks/useError';

const VerifyEmailPage: React.FC = () => {
  const timeoutSeconds = 10;

  const [isSent, setIsSent] = useState(true);
  const { user } = useAuth();
  const [counter, setCounter] = useState(timeoutSeconds);
  const navigate = useNavigate();
  const { setError } = useError();

  useEffect(() => {
    if (isSent === false) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setIsSent(false);
    }, 1000 * timeoutSeconds);

    const itnervalId = setInterval(() => {
      setCounter((prev) => prev - 1);
      if (counter <= 0) {
        clearInterval(itnervalId);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(itnervalId);
    };
  }, [isSent]);

  if (!user) {
    return <p>User is missing in AuthProvider</p>;
  }

  const { email } = user;

  const handleResend = async (userData: UserRegisterDataType) => {
    setIsSent(true);
    const { data, err } = await registerUser(userData);

    if (err) {
      setError(err);
      return;
    }

    console.log(data);
  };

  const handleChangeEmail = () => {
    console.log('navigation to register');
    navigate('/register', { replace: true });
  };

  return (
    <section className="flex flex-col gap-5 mx-5 mt-5 sm:mt-7 sm:gap-7">
      <h1 className="text-xl font-bold sm:text-2xl">Verify Email</h1>
      <p className="text-sm sm:text-lg">
        We sent a verification email to{' '}
        <span className="font-semibold italic underline">{email}</span>
      </p>

      <div className="flex gap-5">
        <Button
          disabled={isSent}
          variant="secondary"
          label="Resend Verification Email"
          className="text-xs sm:text-sm"
          onClick={() =>
            handleResend({
              name: user.name,
              email: user.email,
              password: user.password || '12345678',
            })
          }
        >
          {isSent && (
            <span className="absolute -bottom-1/2 text-black">
              {`Time left: ${counter}`}
            </span>
          )}
          {isSent && <Loader color="white" overlay={true} />}
        </Button>

        <Button
          variant="secondary"
          label="Change Email"
          className="text-xs sm:text-sm"
          onClick={() => handleChangeEmail()}
        />
      </div>

      {/* {error && <ErrorMessage {...error} />} */}
    </section>
  );
};

export default VerifyEmailPage;
