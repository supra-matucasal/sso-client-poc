"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'


const CallbackPage = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {

  const state = searchParams?.state || '';
  const tempToken = searchParams?.tempToken || '';

  const router = useRouter()


  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const authSSOServer = process.env.NEXT_PUBLIC_AUTH_SSO_SERVER;

      //Verifying the state
      const getTokenResponse = await fetch(`${authSSOServer}/api/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tempToken }),
      });

      if (getTokenResponse.status === 200) {
        const { accessToken } = await getTokenResponse.json();
        setAccessToken(accessToken);

        const setCookie = await fetch('/api/auth/set-cookie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken }),
        });

        if (setCookie.status === 200) {
          router.push('/dashboard');
        }
      }
    };

    if (state && tempToken) {
      fetchToken();
    }
  }, [state, tempToken, router]);

  if (!state) {
    return (
      <div>
        <h1>State is required</h1>
      </div>
    );
  }

  if (!accessToken) {
    return (
      <div>
        <h1>Unauthorized access</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Access granted: {accessToken}</h1>
    </div>
  );
};

export default CallbackPage;