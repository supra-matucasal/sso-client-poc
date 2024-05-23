import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


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
    const authSSOServer = process.env.AUTH_SSO_SERVER;

    const response = await fetch(`${authSSOServer}/api/auth/verify-state`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state }),
    });


    if (response.status === 200 && accessToken?.value) {
      redirect('/dashboard');
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