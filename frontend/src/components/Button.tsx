import React from 'react';
import { button } from './variants/button';
import clsx from 'clsx';
import type { BtnVariantType } from '../utils/types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariantType;
  disabled?: boolean;
  label: string;
  className?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  disabled,
  label,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(button({ variant, disabled }), className && className)}
      disabled={disabled}
      {...props}
    >
      <span className="tap-target"></span>
      {label}
      {children && children}
    </button>
  );
};

export default Button;
