'use client'

import { useEffect, useState } from "react";
import { useAuth } from '@/context/AuthContext';
import Link from "next/link";


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

      <Link href="/api/auth/logout">
        Logout
      </Link>
    </div>
  );
};

export default DashboardPage;