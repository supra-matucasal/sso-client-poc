'use client';
import { useEffect } from 'react';
import { randomBytes } from 'crypto';
import { initiateLoginAction } from '@/actions/initiateLoginAction';
import { redirect } from 'next/navigation';



export default function Login() {

useEffect(() => {
    const initiateLogin = async () => {
      //Fetch to SSO-Server auth/generate-login -POST function
      try {
        const redirectTo = await initiateLoginAction();
        window.location.href = redirectTo;

      } catch (error) {
        console.log('Error generating login', error);
      }
    }
    initiateLogin()
  }, []);

  return <div>Redirecting to login...</div>;

}
