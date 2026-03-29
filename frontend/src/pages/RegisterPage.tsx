import type React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../utils/zod.schemas';
import FormField from '../components/FormField';
import Input from '../components/Input';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import Loader from '../components/Loader';
// import ErrorMessage from '../components/ErrorMessage';
import { registerUser } from '../api/auth';
import type { UserRegisterDataType } from '../utils/types';
import { useError } from '../hooks/useError';

export const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterDataType>({
    resolver: zodResolver(registerSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const { setError } = useError();

  const { auth, user } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (userData: UserRegisterDataType) => {
    setIsLoading(true);
    const { data: resData, err: resErr } = await registerUser(userData);

    console.log(resData);

    if (resErr) {
      setError(resErr);
      setIsLoading(false);
      return;
    }

    auth(userData);
    navigate('/verify-email', { replace: true });
  };

  return (
    <section className="max-w-150 flex flex-col items-center justify-center mt-5 mx-3 p-4 border-2 border-gray-400 rounded-xl shadow-md shadow-indigo-950 sm:mt-15 sm:shadow-xl sm:w-8/12 sm:mx-auto">
      <h1 className="text-4xl font-bold">Register</h1>
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
            value={user?.email}
            autoFocus={!!user}
            {...register('email')}
          />
        </FormField>

        <FormField label="Name" htmlFor="name" error={errors?.name?.message}>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your name..."
            error={errors?.name?.message}
            value={user?.name}
            {...register('name')}
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
            value={user?.password}
            {...register('password')}
          />
        </FormField>

        <Button
          label="Register"
          variant="primary"
          type="submit"
          className="mx-auto mt-5 px-5 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading && <Loader overlay={true} color="white" />}
        </Button>

        {/* {error && <ErrorMessage {...error} />} */}

        <p className="flex gap-1 flex-wrap">
          <span>Already have an account?</span>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </section>
  );
};
