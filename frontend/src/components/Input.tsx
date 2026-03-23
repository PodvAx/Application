import clsx from 'clsx';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input: React.FC<InputProps> = ({
  className,
  error,
  ...props
}: InputProps) => {
  return (
    <input
      {...props}
      className={clsx(
        'border border-gray-300 bg-gray-50 rounded-lg p-2 transition-colors duration-300',
        'placeholder:text-sm placeholder:text-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
        'hover:border-indigo-500 transition-colors duration-300',
        error && 'border-red-500 bg-red-50',
        className,
      )}
    />
  );
};

export default Input;
