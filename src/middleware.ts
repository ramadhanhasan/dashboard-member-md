import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { saveUser } from '@/utils//userUtils'
import { USER_LOCAL_STORAGE_KEY } from '@/constants/data'

export async function middleware(request: NextRequest) {
  const publicUrl = ['/signin', '/verified'];
  // get user request cookie
  const userCookie = request.cookies.get(USER_LOCAL_STORAGE_KEY)?.value ?? ''
  let isTokenValid = false
  // check if user cookie is in request
  if (userCookie) {
    // TODO: hit api to get token validity
    isTokenValid = true
  }
  
  // validate if user token is valid
  if (isTokenValid && userCookie) {
    // if valid delete cookie and use new token valid data
    // request.cookies.delete(USER_LOCAL_STORAGE_KEY)

    // check if request path name if from auth or default path redirect to dashboard
    const response = publicUrl.includes(request.nextUrl.pathname)
      ? NextResponse.redirect(new URL('/', request.url))
      : NextResponse.next()

    // TODO: set new cookie data base on token valid data, when refresh token is valid
    saveUser(JSON.parse(userCookie))

    // return response
    return response
  }

  const response =
  publicUrl.includes(request.nextUrl.pathname) 
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/signin', request.url))

  // user cookie doesn't exit or token isn't valid redirect to auth
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
}
