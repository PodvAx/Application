import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import FormField from './FormField';
import Input from './Input';
import Button from './Button';
import { Link } from 'react-router-dom';

interface Field<T> {
  label: string;
  name: keyof T;
  type?: string;
  autocomplete?: string;
  placeholder?: string;
}

type AuthFormProps<T> = {
  title: string;
  onSubmit: (data: any) => void;
  fields: Field<T>[];
  authType: 'login' | 'register';
};

const loginSchema = z.object({
  email: z
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(100, { message: 'Password must be less than 100 characters' }),
});

const registerSchema = z.object({
  email: z
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(100, { message: 'Password must be less than 100 characters' }),
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must be less than 50 characters' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;
type RegisterFormInputs = z.infer<typeof registerSchema>;

const AuthForm: React.FC<
  AuthFormProps<LoginFormInputs | RegisterFormInputs>
> = ({
  title,
  onSubmit,
  fields,
  authType,
}: AuthFormProps<LoginFormInputs | RegisterFormInputs>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authType === 'login' ? loginSchema : registerSchema),
  });

  return (
    <section className="max-w-150 flex flex-col items-center justify-center mt-5 mx-3 p-4 border-2 border-gray-400 rounded-xl shadow-md shadow-indigo-950 sm:mt-15 sm:shadow-xl sm:w-8/12 sm:mx-auto">
      <h1 className="text-4xl font-bold">{title}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 mt-5 w-full"
      >
        {fields.map(
          ({ label, name, type = 'text', autocomplete, placeholder }) => (
            <FormField
              key={name}
              label={label}
              htmlFor={name}
              error={errors?.[name]?.message}
            >
              <Input
                id={name}
                type={type}
                autoComplete={autocomplete}
                placeholder={placeholder}
                error={errors?.[name]?.message}
                {...register(name)}
              />
            </FormField>
          ),
        )}

        <Button
          label={authType === 'login' ? 'Login' : 'Register'}
          variant="primary"
          type="submit"
          className="mx-auto mt-5 px-5 cursor-pointer"
        />

        <p className="flex gap-1 flex-wrap">
          <span>
            {authType === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}
          </span>
          <Link
            to={`/${authType === 'login' ? 'register' : 'login'}`}
            className="text-blue-500 hover:underline"
          >
            {authType === 'login' ? 'Register here' : 'Login here'}
          </Link>
        </p>
      </form>
    </section>
  );
};

export default AuthForm;
