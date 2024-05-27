import { NextRequest, NextResponse } from 'next/server';
import { getCookie, setCookie } from './utils/cookies';
import { verifyToken } from './services/auth';
import { setCookie as cookiesNextSetCookie } from 'cookies-next';



const COOKIE_NAME = process.env.COOKIE_NAME;
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;
const OTHER_COOKIE_NAMES = process.env.OTHER_COOKIE_NAMES?.split(',');
const COOKIE_MAX_AGE = process.env.COOKIE_MAX_AGE || '3600';


export async function middleware(request: NextRequest) {


  if (!COOKIE_NAME || !COOKIE_DOMAIN || !OTHER_COOKIE_NAMES) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  let ownCookie = getCookie(COOKIE_NAME);
  let isValidToken = false;

  if (!ownCookie) {
    for (const cookieName of OTHER_COOKIE_NAMES) {
      const cookieValue = getCookie(cookieName);
      if (cookieValue) {
        const response = NextResponse.next();
        response.cookies.set({
          name: COOKIE_NAME,
          value: cookieValue,
          httpOnly: true,
          sameSite: 'strict',
          path: '/',
          domain: COOKIE_DOMAIN,
          maxAge: +COOKIE_MAX_AGE
        });

        return response;
      }
    }

  }

  if (ownCookie) {
    isValidToken = await verifyToken(ownCookie);
  }


  if (!isValidToken) {
    if (request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/callback') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (isValidToken && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }


  return NextResponse.next();
}


export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}