import React from 'react';
import { MdWarningAmber } from 'react-icons/md';

type FormFieldProps = {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
};

const FormField: React.FC<FormFieldProps> = ({ label, error, children }) => {
  return (
    <label htmlFor="email" className="relative flex flex-col gap-2">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      {children}
      {error && (
        <span className="absolute text-red-500 text-sm mt-1 -bottom-6 flex items-center gap-2">
          <MdWarningAmber />
          {error}
        </span>
      )}
    </label>
  );
};

export default FormField;
