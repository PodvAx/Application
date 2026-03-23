import type React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import FormField from '../components/FormField';
import Input from '../components/Input';
import Button from '../components/Button';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// import { login } from '../utils/api';

const loginSchema = z.object({
  email: z
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(100, { message: 'Password must be less than 100 characters' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data: any) => {
    // const res = await login(data);
    // console.log(res);
    console.log(data);
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
            autoComplete="email"
            placeholder="Enter your email here..."
            error={errors?.email?.message}
            {...register('email', { required: 'Email is required' })}
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
            autoComplete="password"
            placeholder="Enter your password here..."
            error={errors?.password?.message}
            {...register('password', { required: 'Password is required' })}
          />
        </FormField>

        <Button
          label="Login"
          variant="primary"
          type="submit"
          className="mx-auto mt-5 px-5"
        />
      </form>
    </section>
  );
};
