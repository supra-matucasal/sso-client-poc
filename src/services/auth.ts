const authSSOServer = process.env.NEXT_PUBLIC_AUTH_SSO_SERVER;



async function verifyToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${authSSOServer}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.status === 200;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
}



export {
  verifyToken
}