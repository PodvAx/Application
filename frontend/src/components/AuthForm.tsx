import FormField from './FormField';
import Input from './Input';
import Button from './Button';
import { Link } from 'react-router-dom';
import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

interface AuthField<T> {
  label: string;
  name: keyof T;
  type: string;
  autocomplete?: string;
  placeholder?: string;
}

type AuthFormProps<T extends FieldValues> = {
  title: string;
  onSubmit: (data: any) => void;
  fields: AuthField<T>[];
  authType: 'login' | 'register';
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
};

const AuthForm = <T extends FieldValues>({
  title,
  onSubmit,
  fields,
  authType,
  register,
  errors,
}: AuthFormProps<T>) => {
  return (
    <section className="max-w-150 flex flex-col items-center justify-center mt-5 mx-3 p-4 border-2 border-gray-400 rounded-xl shadow-md shadow-indigo-950 sm:mt-15 sm:shadow-xl sm:w-8/12 sm:mx-auto">
      <h1 className="text-4xl font-bold">{title}</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-10 mt-5 w-full">
        {fields.map(
          ({ label, name, type = 'text', autocomplete, placeholder }) => (
            <FormField
              key={String(name)}
              label={label}
              htmlFor={String(name)}
              error={String(errors?.[name]?.message)}
            >
              <Input
                id={String(name)}
                type={type}
                autoComplete={autocomplete}
                placeholder={placeholder}
                error={String(errors?.[name]?.message)}
                // todo: Fix this any
                {...register(name as any)}
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
