'use client'

import { useEffect, useState } from "react";
import { useAuth } from '@/context/AuthContext';
import Link from "next/link";
import { getEvents } from "@/services/api";


const DashboardPage = () => {

  const { user, getUserInfo, accessToken } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!user) {
      getUserInfo();
    } 
  }, [user, getUserInfo]);

  useEffect(() => {
    if (accessToken) {
      console.log('Getting events with accessToken: ', accessToken)
      getEvents(accessToken)
        .then((data) => {
          setEvents(data.data);
        })
        .catch((error) => {
          console.error('Error getting events: ', error);
        });
    }
  }, [accessToken]);

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Welcome, {user ? user.first_name + ' - ' + user.email : 'Guest'}</h1>

      <p>Access Token: {accessToken ? accessToken : 'No access token available'}</p>

      <h2>Events</h2>
      <ul>
        {events && events.length > 0 && events.map((event) => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>

      <Link href="/api/auth/logout">
        Logout
      </Link>
    </div>
  );
};

export default DashboardPage;