import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

const base = 'px-4 py-2 rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400',
  secondary: 'bg-gray-200 text-blue-900 hover:bg-gray-300 focus:ring-blue-200',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  ...props
}) => (
  <button
    className={`${base} ${variants[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button; 