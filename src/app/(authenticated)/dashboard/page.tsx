'use client'

import { useEffect, useState } from "react";

const DashboardPage = () => {

  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const accessTokenStorage = window.localStorage.getItem('accessToken');
    if (accessTokenStorage)
      setAccessToken(accessTokenStorage);
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Access Token: {accessToken ? accessToken : 'No access token available'}</p>
    </div>
  );
};

export default DashboardPage;