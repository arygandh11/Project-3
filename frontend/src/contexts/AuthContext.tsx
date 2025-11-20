import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getCurrentUser, logout as apiLogout, type User } from '../api/authApi';

/**
 * Authentication context interface
 */
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

/**
 * Create authentication context
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication provider component
 * Manages authentication state and provides auth methods to children
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Check if user is authenticated on mount and after auth state changes
   */
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Check authentication status by fetching current user
   * @param retries Number of retry attempts (for OAuth redirect timing issues)
   */
  const checkAuth = async (retries = 0) => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    } catch (error) {
      console.error('Error checking auth:', error);
      // Retry once after a short delay if this is the first attempt
      // This helps with OAuth redirect timing issues
      if (retries === 0) {
        setTimeout(() => {
          checkAuth(1);
        }, 500);
        // Don't set loading to false yet, wait for retry
        return;
      }
      // If retry also failed, set user to null and stop loading
      setUser(null);
      setLoading(false);
    }
  };

  /**
   * Refresh user data from server
   */
  const refreshUser = async () => {
    await checkAuth();
  };

  /**
   * Initiate Google OAuth login
   * This function is kept for backward compatibility but loginWithGoogle from authApi should be used directly
   */
  const login = () => {
    // Redirect to Google OAuth
    window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'}/auth/google`;
  };

  /**
   * Logout current user
   */
  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      // Even if API call fails, clear local state
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use authentication context
 * @returns Authentication context value
 * @throws Error if used outside AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

