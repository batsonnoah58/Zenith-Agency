import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import Skeleton from './Skeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, token, initialized, loading } = useAuthStore();

  // Show loading state while initializing
  if (!initialized || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full border border-gray-100 text-center">
          <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
          <Skeleton className="w-48 h-6 mx-auto mb-2" />
          <Skeleton className="w-32 h-4 mx-auto" />
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  // Show protected content if authenticated
  return <>{children}</>;
};

export default ProtectedRoute; 