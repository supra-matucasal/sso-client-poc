import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';
import { access } from 'fs';
import { redirect } from 'next/navigation'


export async function GET(req: NextRequest) {
  // Receive state from the SSO Server
  const state = req.nextUrl.searchParams.get('state');

  //Check if the state is valid
  if (!state) {
    return NextResponse.json({ error: 'State is required' }, { status: 400 });
  }

  try {
    const authSSOServer = process.env.AUTH_SSO_SERVER || 'http://localhost:3000';

    const response = await axios.post(`${authSSOServer}/api/auth/verify/state`, { state });
    if (response.status === 200) {
      const { token } = response.data;
      // Set the token as a secure cookie
      cookies().set({
        name: 'sso-token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/',
        maxAge: 3600, // 1 hour
      });

      return NextResponse.redirect(new URL('/dashboard', req.url))


    } else {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });

    }

  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }


}
