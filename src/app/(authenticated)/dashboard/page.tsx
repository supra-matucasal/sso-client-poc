'use client'

import { useEffect, useState } from "react";
import { useAuth } from '@/context/AuthContext';


const DashboardPage = () => {

  const { user, getUserInfo, accessToken } = useAuth();

  useEffect(() => {
    if (!user) {
      getUserInfo();
    }
  }, [user, getUserInfo]);

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Welcome, {user ? user.first_name + ' - ' + user.email : 'Guest'}</h1>

      <p>Access Token: {accessToken ? accessToken : 'No access token available'}</p>
    </div>
  );
};

export default DashboardPage;