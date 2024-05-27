const AUTH_SSO_SERVER = process.env.AUTH_SSO_SERVER;


async function verifyToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${AUTH_SSO_SERVER}/api/auth/me`, {
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