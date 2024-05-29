import { getCookie } from '@/utils/cookies';
import { ReactNode } from 'react';
import { AuthProvider } from '../../context/AuthContext';


const ProtectedLayout = ({ children }: { children: ReactNode }) => {


  const session = getCookie('session');

  if (!session) {
    return <div>Not authenticated</div>;
  }




  return (
    <div>
      <AuthProvider session={session}>
        <div>{children}</div>
      </AuthProvider>
    </div>
  );
};

export default ProtectedLayout;