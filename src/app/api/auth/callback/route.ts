import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  console.log('callback route...')

  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');


  if (!code || !state) {
    return new NextResponse(JSON.stringify({ error: 'code and state are required' }), { status: 400 });
  }

  //TODO: Validate state

  //Request the token to the SSO Server with code and credentials
  // "grant_type": "authorization_code",
  // "client_id": "YOUR_CLIENT_ID",
  // "client_secret": "YOUR_CLIENT_SECRET",
  // "code": "AUTHORIZATION_CODE",
  // "redirect_uri": "YOUR_CALLBACK_URL"

  const client_id = process.env.AUTH_SSO_CLIENT_ID;
  const redirect_url = process.env.AUTH_REDIRECT_URL;
  const client_secret = process.env.AUTH_SSO_CLIENT_SECRET;

  const response = await fetch(`${process.env.AUTH_SSO_SERVER}/api/auth/token`, {
    method: 'POST',
    headers: headers(),
    credentials: 'include',
    body: JSON.stringify({ code, client_id, redirect_url, client_secret }),

  });

  if (response.status !== 200) {
    return new NextResponse(JSON.stringify({ error: 'Invalid code' }), { status: 400 });
  }

  const { accessToken } = await response.json();

  const res = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`);
  res.cookies.set({
    name: process.env.SESSION_NAME || 'session',
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
    path: '/',
    maxAge: 3600,
  });

  return res;

}