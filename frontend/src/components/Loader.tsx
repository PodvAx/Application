import React from 'react';
import clsx from 'clsx';

type LoaderProps = {
  size?: number;
  color?: string;
  thickness?: number;
  fullScreen?: boolean;
  overlay?: boolean;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  size = 24,
  color = 'border-indigo-500',
  thickness = 3,
  fullScreen = false,
  overlay = false,
  className,
}) => {
  const spinner = (
    <div
      className={clsx(
        'animate-spin rounded-full border-t-transparent',
        color,
        className,
      )}
      style={{
        width: size,
        height: size,
        borderWidth: thickness,
      }}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        {spinner}
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-transparent">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loader;
