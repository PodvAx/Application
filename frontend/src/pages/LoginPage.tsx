import type React from 'react';
// import { useForm, type SubmitHandler } from 'react-hook-form';
import FormField from '../components/FormField';
import Input from '../components/Input';
import Button from '../components/Button';
// import z from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '../utils/api';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

// const loginSchema = z.object({
//   email: z
//     .email({ message: 'Invalid email address' })
//     .min(1, { message: 'Email is required' }),
//   password: z
//     .string()
//     .min(1, { message: 'Password is required' })
//     .min(6, { message: 'Password must be at least 6 characters' })
//     .max(100, { message: 'Password must be less than 100 characters' }),
// });

// type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<LoginFormInputs>({
  //   resolver: zodResolver(loginSchema),
  // });

  const onSubmit = async (data: any) => {
    const res = await login(data);
    console.log(res);
  };

  return (
    <AuthForm
      title="Login"
      onSubmit={onSubmit}
      fields={[
        {
          label: 'Email',
          name: 'email',
          type: 'email',
          autocomplete: 'email',
          placeholder: 'Enter your email here...',
        },
        {
          label: 'Password',
          name: 'password',
          type: 'password',
          autocomplete: 'current-password',
          placeholder: 'Enter your password here...',
        },
      ]}
      authType="login"
    />
  );
};
