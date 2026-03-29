import type React from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../utils/zod.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from '../components/FormField';
import Input from '../components/Input';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import type { UserLoginDataType } from '../utils/types';
import { getMe, loginUser } from '../api/auth';
import { useError } from '../hooks/useError';
import { saveAccessToken } from '../utils/helpers';
import { useAuth } from '../hooks/useAuth';
// import ErrorMessage from '../components/ErrorMessage';

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginDataType>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const { setError } = useError();

  const { auth } = useAuth();

  const onSubmit = async (userData: UserLoginDataType) => {
    const { data, err } = await loginUser(userData);

    if (err) {
      setError(err);
      return;
    }

    if (!data) {
      return;
    }

    saveAccessToken(data.accessToken);

    getMe().then(({ data, err }) => {
      if (err) {
        setError(err);
        return;
      }

      if (!data) {
        return;
      }

      auth(data);
    });

    navigate('/', { replace: true });
  };

  return (
    <section className="max-w-150 flex flex-col items-center justify-center mt-5 mx-3 p-4 border-2 border-gray-400 rounded-xl shadow-md shadow-indigo-950 sm:mt-15 sm:shadow-xl sm:w-8/12 sm:mx-auto">
      <h1 className="text-4xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 mt-5 w-full"
      >
        <FormField label="Email" htmlFor="email" error={errors?.email?.message}>
          <Input
            id="email"
            type="text"
            autoComplete="email"
            placeholder="Enter your email..."
            error={errors?.email?.message}
            {...register('email')}
          />
        </FormField>

        <FormField
          label="Password"
          htmlFor="password"
          error={errors?.password?.message}
        >
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password..."
            error={errors?.password?.message}
            {...register('password')}
          />
        </FormField>

        <Button
          label="Login"
          variant="primary"
          type="submit"
          className="mx-auto mt-5 px-5 cursor-pointer"
        />

        <p className="flex gap-1 flex-wrap">
          <span>Don't have an account?</span>
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </form>

      {/* {error && <ErrorMessage {...error} />} */}
    </section>
  );
};
