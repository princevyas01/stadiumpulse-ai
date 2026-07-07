import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateCsrfToken } from './lib/csrf';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.get('sp_session')) {
    response.cookies.set('sp_session', crypto.randomUUID(), {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 4,
    });
  }

  if (!request.cookies.get('sp_csrf')) {
    response.cookies.set('sp_csrf', await generateCsrfToken(), {
      httpOnly: false,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 4,
    });
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
