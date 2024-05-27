import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { setCookie } from "@/utils/cookies";

export async function POST(req: NextRequest, res: NextResponse) {
  const { accessToken } = await req.json();

  if (!accessToken) {
    return NextResponse.json({ error: 'accessToken is required' }, { status: 400 });
  }

 
  // const cookieMaxAge = process.env.COOKIE_MAX_AGE || '3600';
  // const cookieDomain = process.env.COOKIE_DOMAIN || 'localhost';
  // const cookieName = process.env.COOKIE_NAME || 'sso-token-client1'

  // cookies().set({
  //   name: cookieName,
  //   value: accessToken,
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== 'development',
  //   sameSite: 'strict',
  //   path: '/',
  //   domain: cookieDomain, 
  //   maxAge: +cookieMaxAge
  // });
  
  const cookieName = process.env.COOKIE_NAME || 'sso-token-client1'
  setCookie(cookieName, accessToken);

  return NextResponse.json({ message: 'Cookie stored' }, { status: 200 });

}
