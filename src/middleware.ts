import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  
  const cookieName = process.env.COOKIE_NAME;
  if(!cookieName) {
    return Response.redirect(new URL('/login', request.url))
  }
  const token = request.cookies.get(cookieName)?.value
  
  if (token) {
    try {
      const authSSOServer = process.env.AUTH_SSO_SERVER;

      const response = await fetch(`${authSSOServer}/api/auth/me`, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      })
      if (response.status === 200) {
        if (!request.nextUrl.pathname.startsWith('/dashboard')) {
          return Response.redirect(new URL('/dashboard', request.url))

        }
      } else {
        return Response.redirect(new URL('/login', request.url))

      }
    } catch (error) {
      return Response.redirect(new URL('/login', request.url))

    }

  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}