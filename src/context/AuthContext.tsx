import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { verifyToken } from '@/services/auth';


interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()

  console.log('provider...')

  useEffect(() => {
    const token = window.localStorage.getItem('accessToken');
    console.log('token: ', token)

    if (token) {
      // Verify the token with the SSO server
      const localVerifyToken = async () => {
        try {
          await verifyToken(token);
        } catch (error) {
          console.error('Error verifying token:', error);
          router.push('/login');
        } finally {
          setIsLoading(false);
        }
      };

      localVerifyToken();
    } else {
      console.log('No token found');
      setIsLoading(false);
      router.push('/login');
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
