import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useError } from '../hooks/useError';

const ErrorMessage: React.FC = () => {
  const timeoutSeconds = 60;

  const { error, cleanError } = useError();

  useEffect(() => {
    const timerId = setTimeout(() => {
      cleanError();
    }, timeoutSeconds * 1000);

    return () => {
      clearTimeout(timerId);
    };
  });

  if (!error) {
    return null;
  }

  const { statusText, status, message, type } = error;

  return (
    <div className="flex flex-col gap-2 fixed bottom-2 right-2 left-2 max-h-[40vh] overflow-y-auto bg-red-700/90 p-3 rounded-lg text-white text-xs sm:left-auto sm:max-w-sm">
      <div className="flex justify-between items-start gap-5">
        <h4 className="font-semibold text-sm">{`${statusText || 'Error'}: ${status || 'Unknown'}`}</h4>
        <button
          onClick={cleanError}
          className="cursor-pointer hover:scale-150 active:scale-90 transition-transform"
        >
          <span className="tap-target"></span>
          <MdClose className="size-4" />
        </button>
      </div>
      <h5 className="font-semibold">{`Error type: ${type}`}</h5>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
