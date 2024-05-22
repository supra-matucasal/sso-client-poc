'use client';
import { useEffect } from 'react';
import { randomBytes } from 'crypto';


export default function Login() {




  useEffect(() => {
    const initiateLogin = async () => {
      console.log('Initiating login...')
      const redirectUrl = process.env.AUTH_REDIRECT_URL || 'http://localhost:4000/api/callback';
      const secretToken = process.env.TOKEN_EXTERNAL_APPS || 'token';
      const authSSOServer = process.env.AUTH_SSO_SERVER || 'http://localhost:3000';

      const state = randomBytes(16).toString('hex');

      //Fetch to SSO-Server auth/generate-login -POST function
      try {
        const response = await fetch(`${authSSOServer}/api/auth/generate-login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ redirect: redirectUrl, token: secretToken, state: state })
        });

        console.log('response', response)

        if (response.status === 200) {
          const data = await response.json();
          console.log('data: ', data)
          console.log('data.redirectUr: ', data.redirectTo)
          window.location.href = data.redirectTo;
        }
      } catch (error) {
        console.log('Error generating login', error);
      }
    }
    initiateLogin()
  }, []);

  return <div>Redirecting to login...</div>;
}
