'use client'

import { ReactNode } from 'react';
import { AuthProvider } from '../../context/AuthContext';


const ProtectedLayout = ({ children }: { children: ReactNode }) => {

  return (
    <div>
      <AuthProvider>
        <div>{children}</div>
      </AuthProvider>
    </div>
  );
};

export default ProtectedLayout;