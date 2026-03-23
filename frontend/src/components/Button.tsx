import React from 'react';
import type { BtnVariantType } from '../types/button-variant.type';
import { button } from './variants/button';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariantType;
  label: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  label,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(button({ variant }), className && className)}
      {...props}
    >
      <span className="tap-target"></span>
      {label}
    </button>
  );
};

export default Button;
