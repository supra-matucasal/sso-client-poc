import { cookies } from 'next/headers'

const DashboardPage = () => {

  const cookieStore = cookies()
  const accessToken = cookieStore.get('sso-token')


  return (
    <div>
      <h1>Dashboard</h1>
      <p>Access Token: {accessToken ? accessToken.value : 'No access token available'}</p>
    </div>
  );
};

export default DashboardPage;