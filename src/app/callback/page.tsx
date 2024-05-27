"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

import axios from 'axios';

const CallbackPage = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {

  //const state = searchParams?.state || '';
  const tempToken = searchParams?.tempToken || '';
  const accessToken = '' + searchParams?.accessToken || '';

  const router = useRouter()


  const [accessTokenParam, setAccessTokenParam] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const authSSOServer = process.env.NEXT_PUBLIC_AUTH_SSO_SERVER;

      //Verifying the temp token
      const getTokenResponse = await fetch(`${authSSOServer}/api/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tempToken }),
        credentials: 'include',
        //origin: 'http://localhost:3000',
      });

      //Doing the same request with axios
      //const getTokenResponse = await axios.post(`${authSSOServer}/api/auth/token`, { tempToken }, { withCredentials: true });

      if (getTokenResponse.status === 200) {
        const { accessToken } = await getTokenResponse.json();
        setAccessTokenParam(accessToken);
        localStorage.setItem('accessToken', accessToken);
        router.push('/dashboard');

        // const setCookie = await fetch('/api/auth/set-cookie', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ accessToken }),
        // });

        // if (setCookie.status === 200) {
        //   router.push('/dashboard');
        // }

        //Store the access token in a localstorage

      }
    };

    if (tempToken) {
      fetchToken();
    } else if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      router.push('/dashboard');
    }
  }, [tempToken, router, accessToken]);


  if (!accessTokenParam && !accessToken) {
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