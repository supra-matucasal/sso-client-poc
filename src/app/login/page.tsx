'use client';
import { useEffect } from 'react';

export default function Login() {
  
  useEffect(() => {
    const redirectUrl = 'http://localhost:4000/callback';
    const secretToken = 'token'; 

    // Redirect to the SSO Server login page
    window.location.href = `http://localhost:3000/login?redirect=${encodeURIComponent(redirectUrl)}&token=${secretToken}`;
  }, []);

  return <div>Redirecting to login...</div>;
}
