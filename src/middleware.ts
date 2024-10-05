import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { saveAffUser, saveUser } from '@/utils//userUtils'
import { AFF_STORAGE_KEY, FUNNEL_STORAGE_KEY, USER_LOCAL_STORAGE_KEY } from '@/constants/data'
import getOneLinkRepository from './app/(dashboard)/links/_repository/getOneRepository';

export async function middleware(request: NextRequest) {
  const urlSearchParams = new URLSearchParams(request.nextUrl.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const publicUrl = ['login', 'verified', 'forgot-password', 'forgot-password/success', 'reset-password', 'lp', 'checkout'];
  // get user request cookie
  const userCookie = request.cookies.get(USER_LOCAL_STORAGE_KEY)?.value ?? ''
  let isTokenValid = false
  // check if user cookie is in request
  
  if (request.nextUrl.pathname.split('/')[1] === 'lp') {
    const data = await getOneLinkRepository(Number(params['i']) || 0, params['whatsapp']);
    const affCookie = request.cookies.get(AFF_STORAGE_KEY)?.value ?? ''
    const aff = params['aff'];
    
    const res = NextResponse.redirect(data.data.url + '?whatsapp='+ params['whatsapp'] + '&affcode='+aff + '&funnel='+data.data.name, 302); // External website URL
    
    const expire = new Date()
    expire.setDate(expire.getDate() + 90)
      
    res.cookies.set(FUNNEL_STORAGE_KEY, data.data.name, {
      // httpOnly: true,  // Secure, not accessible via JavaScript
      // path: '/',       // Path for which the cookie is valid
      // sameSite: 'strict',  // Control cross-site request behavior
      maxAge: 60 * 60 * 24 * 90, // Optional: Set max-age for cookie (in seconds)
      expires: expire, // Optional: expires in 1 day
    });

    if (affCookie == '' && aff && aff != '') {
      res.cookies.set(AFF_STORAGE_KEY, aff, {
        // httpOnly: true,  // Secure, not accessible via JavaScript
        // path: '/',       // Path for which the cookie is valid
        // sameSite: 'strict',  // Control cross-site request behavior
        maxAge: 60 * 60 * 24 * 90, // Optional: Set max-age for cookie (in seconds)
        expires: expire, // Optional: expires in 1 day
      });
    }
    return res;
  }
  
  if (userCookie) {
    // TODO: hit api to get token validity
    isTokenValid = true
  }
  
  // validate if user token is valid
  if (isTokenValid && userCookie) {
    // if valid delete cookie and use new token valid data
    // request.cookies.delete(USER_LOCAL_STORAGE_KEY)

    // check if request path name if from auth or default path redirect to dashboard
    const response = publicUrl.includes(request.nextUrl.pathname.split('/')[1])
      ? NextResponse.redirect(new URL('/', request.url))
      : NextResponse.next()

    // TODO: set new cookie data base on token valid data, when refresh token is valid
    saveUser(JSON.parse(userCookie))

    // return response
    return response
  }

  const response =
  publicUrl.includes(request.nextUrl.pathname.split('/')[1]) 
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/login', request.url))

  // user cookie doesn't exit or token isn't valid redirect to auth
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
}
