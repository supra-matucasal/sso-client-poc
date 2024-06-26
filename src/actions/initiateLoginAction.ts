'use server';

import { randomBytes } from 'crypto';

export async function initiateLoginAction() {

  console.log('process.env.AUTH_REDIRECT_URL: ', process.env.AUTH_REDIRECT_URL)
  console.log('process.env.TOKEN_EXTERNAL_APPS: ', process.env.TOKEN_EXTERNAL_APPS)
  console.log('process.env.AUTH_SSO_SERVER; ', process.env.AUTH_SSO_SERVER)

  const redirectUrl = process.env.AUTH_REDIRECT_URL;
  const secretToken = process.env.TOKEN_EXTERNAL_APPS;
  const authSSOServer = process.env.AUTH_SSO_SERVER;

  if (!redirectUrl || !secretToken || !authSSOServer) {
    throw new Error('Missing environment variables');
  }

  const state = randomBytes(16).toString('hex');

  // Fetch to SSO-Server auth/generate-login -POST function
  try {
    const response = await fetch(`${authSSOServer}/api/auth/generate-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ redirect: redirectUrl, token: secretToken, state: state }),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data.redirectTo;
    } else {
      throw new Error('Failed to generate login');
    }
  } catch (error) {
    console.error('Error generating login', error);
    throw error;
  }
}
