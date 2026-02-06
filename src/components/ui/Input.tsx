import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => {
  return (
    <div className="w-full space-y-2">
      {label && <label className="block text-sm font-medium text-brand-white/70 ml-1">{label}</label>}
      <input
        className={`w-full bg-brand-charcoal border-2 border-brand-gray text-brand-white px-4 py-3 rounded-brand-md focus:outline-none focus:border-brand-orange transition-colors placeholder:text-brand-gray-light ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
