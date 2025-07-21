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

    interface AuthState {
  isAuthenticated: boolean;
  user: { uid: string; email: string } | null; // Add | null here
  loading: boolean;
}
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}

