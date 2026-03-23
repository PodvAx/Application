import { cva } from 'class-variance-authority';

export const button = cva(
  'p-2 relative flex gap-1 items-center justify-center rounded-lg transition-colors duration-300 hover:bg-indigo-700 hover:text-white active:bg-indigo-500 active:text-white active:duration-0',
  {
    variants: {
      variant: {
        primary: 'text-xl font-semibold text-white bg-indigo-600',
        secondary: 'text-white bg-indigo-600',
        tertiary: 'bg-transparent',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'secondary',
    },
  },
);
