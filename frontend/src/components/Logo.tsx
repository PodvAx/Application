import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  size?: number;
  className?: string;
};

const Logo: React.FC<Props> = ({ size = 20, className = '' }: Props) => {
  const sizeClasses: Record<number, string> = {
    5: 'w-5 h-5 md:w-7 md:h-7 lg:w-10 lg:h-10',
    10: 'w-10 h-10 md:w-15 md:h-15 lg:w-20 lg:h-20',
    15: 'w-15 h-15 md:w-20 md:h-20 lg:w-25 lg:h-25',
    20: 'w-20 h-20 md:w-25 md:h-25 lg:w-30 lg:h-30',
    25: 'w-25 h-25 md:w-30 md:h-30 lg:w-35 lg:h-35',
    30: 'w-30 h-30 md:w-35 md:h-35 lg:w-40 lg:h-40',
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
