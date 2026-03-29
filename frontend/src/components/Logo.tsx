import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  size?: number;
  className?: string;
};

const Logo: React.FC<Props> = ({ size = 20, className = '' }: Props) => {
  const sizeClasses: Record<number, string> = {
    10: 'w-10 h-10 sm:w-20 sm:h-20 lg:w-25 lg:h-25',
    20: 'w-20 h-20 sm:w-25 sm:h-25 lg:w-30 lg:h-30',
    25: 'w-25 h-25 sm:w-30 sm:h-30 lg:w-35 lg:h-35',
    30: 'w-30 h-30 sm:w-35 sm:h-35 lg:w-40 lg:h-40',
    35: 'w-35 h-35',
    40: 'w-40 h-40',
  };

  return (
    <Link
      to="/"
      className={`shrink-0 flex items-center justify-center bg-indigo-100  rounded-full hover:bg-indigo-400 active:bg-amber-800 transition-colors duration-300 ${className}`}
    >
      <img
        src="/logo_transparent_bg_light.png"
        alt="EventManager Logo"
        className={`${sizeClasses[size] || 'w-20 h-20'} rounded-full`}
      />
    </Link>
  );
};

export default Logo;
