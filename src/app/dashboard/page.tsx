import { cookies } from 'next/headers'

const DashboardPage = () => {

  const cookieStore = cookies()
  const cookieName = process.env.COOKIE_NAME;

  if(!cookieName) {
    return <div>Cookie name not found</div>
  }
  const accessToken = cookieStore.get(cookieName)


  return (
    <div>
      <h1>Dashboard</h1>
      <p>Access Token: {accessToken ? accessToken.value : 'No access token available'}</p>
    </div>
  );
};

export default DashboardPage;