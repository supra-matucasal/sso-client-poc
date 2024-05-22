import { cookies } from 'next/headers'

//const CallbackPage = (searchParams) => {
//CallbackPage with searchParams (query params)
const CallbackPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {


  //I check the state with the cookie
  const cookieStore = cookies()
  const accessToken = cookieStore.get('sso-token')

  const state = searchParams?.state;

  if (state){
    const authSSOServer = process.env.AUTH_SSO_SERVER || 'http://localhost:3000';

    const response = await fetch(`${authSSOServer}/api/auth/verify/state`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state }),
    });

    console.log('response', response)

    if (response.status === 200) {
      return (
        <div>
          <h1>Dashboard</h1>
          <p>Access Token: {accessToken ? accessToken.value : 'No access token available'}</p>
          <p>State: {state}</p>
        </div>
      );

    } else {
      return (
        <div>
          <h1>Unauthorized access</h1>
        </div>
      );
    }
  } else {
    return (
      <div>
        <h1>State is required</h1>
      </div>
    );
  }

  
};

export default CallbackPage;