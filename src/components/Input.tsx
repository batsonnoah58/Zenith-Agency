import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => (
  <div className="mb-2">
    {label && <label className="block mb-1 font-medium" htmlFor={props.id}>{label}</label>}
    <input
      className={`w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition ${error ? 'border-red-400' : ''} ${className}`}
      {...props}
    />
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

export default Input; 