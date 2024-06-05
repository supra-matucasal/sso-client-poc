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

async function fetchUserInfo(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${authSSOServer}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if(response.status !== 200) {
      return false;
    }
    const data = await response.json();
    console.log('Data from me', data)
    return data;

  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
}




export {
  verifyToken,
  fetchUserInfo
}