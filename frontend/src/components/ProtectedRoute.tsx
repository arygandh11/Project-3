import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

/**
 * Protected Route component
 * Redirects to login if user is not authenticated
 * Shows loading state while checking authentication
 */
interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading, refreshUser } = useAuth();
  const hasRefreshed = useRef(false);

  // Refresh auth when component mounts (helps with OAuth redirect timing)
  useEffect(() => {
    if (!loading && !isAuthenticated && !hasRefreshed.current) {
      // Give it a moment for session cookie to be available, then refresh
      hasRefreshed.current = true;
      const timer = setTimeout(() => {
        refreshUser();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, isAuthenticated, refreshUser]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render protected content if authenticated
  return <>{children}</>;
}

export default ProtectedRoute;

