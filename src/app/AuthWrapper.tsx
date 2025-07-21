// Temporary fix for AuthWrapper.tsx


'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Create a simple auth context without Firebase for now
interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: false, // Set to false to avoid blocking the app
  });

  // For now, we'll just set the user as "authenticated" to bypass Firebase
  useEffect(() => {

    setAuthState({
      isAuthenticated: true,
      user: { uid: 'dev-user', email: 'dev@example.com' },
      loading: false,
    });
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}

