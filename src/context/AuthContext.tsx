'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { verifyToken, fetchUserInfo } from '@/services/auth';
import Cookies from 'js-cookie';

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  user: any;
  getUserInfo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode, session: string }> = ({ children, session }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()

  console.log('provider...')

  const getUserInfo = async (token: string | null = accessToken) => {
    if (!token) {
      console.error('No access token available');
      return;
    }
    try {
      const userInfo = await fetchUserInfo(token);
      console.log('userInfo:', userInfo);
      setUser(userInfo);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    
    
    if (session) {
      // Verify the token with the SSO server
      const localVerifyToken = async () => {
        try {
          await verifyToken(session);
          setAccessToken(session);
          await getUserInfo(session);

        } catch (error) {
          console.error('Error verifying token:', error);
          router.push('/login');
        } finally {
          setIsLoading(false);
        }
      };

      localVerifyToken();
    } else {
      console.log('No Session found');
      setIsLoading(false);
      //router.push('/login');
    }
  }, [router, session]);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  

  

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, user, getUserInfo }}>
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
