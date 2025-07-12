import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4', 
  rounded = 'md' 
}) => {
  const roundedClass = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }[rounded];

  return (
    <div 
      className={`animate-pulse bg-gray-200 ${width} ${height} ${roundedClass} ${className}`}
      aria-label="Loading..."
    />
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white rounded-xl shadow p-6 border border-gray-100 ${className}`}>
    <div className="flex items-center mb-4">
      <Skeleton className="w-12 h-12 rounded-full mr-3" />
      <div className="flex-1">
        <Skeleton className="w-32 h-4 mb-2" />
        <Skeleton className="w-24 h-3" />
      </div>
    </div>
    <Skeleton className="w-full h-20 mb-4" />
    <div className="flex gap-2">
      <Skeleton className="w-20 h-8" />
      <Skeleton className="w-24 h-8" />
    </div>
  </div>
);

export const SkeletonTable: React.FC = () => (
  <div className="bg-white rounded-xl shadow overflow-hidden">
    <div className="p-4 border-b">
      <Skeleton className="w-48 h-6" />
    </div>
    <div className="p-4 space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-16 h-4" />
        </div>
      ))}
    </div>
  </div>
);

export default Skeleton; 