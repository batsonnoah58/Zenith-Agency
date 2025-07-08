import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  shadow?: boolean;
  border?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', shadow = true, border = true }) => (
  <div
    className={`bg-white rounded-2xl ${shadow ? 'shadow-lg' : ''} ${border ? 'border border-gray-100' : ''} p-6 ${className}`}
  >
    {children}
  </div>
);

export default Card; 