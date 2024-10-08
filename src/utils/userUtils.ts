import { setCookie, getCookie, deleteCookie } from 'cookies-next'

import { AFF_STORAGE_KEY, USER_LOCAL_STORAGE_KEY } from '@/constants/data'

interface UserToken {
  accessToken: string
}

export function saveUser(user: UserToken): void {
  const expire = new Date()
  expire.setDate(expire.getDate() + 1)
  setCookie(
    USER_LOCAL_STORAGE_KEY,
    JSON.stringify({ accessToken: user.accessToken }),
    {
      maxAge: 60 * 60 * 24,
      expires: expire,
      path: '/',
    },
  )
}

export function saveAffUser(referral_code: string): void {
  const expire = new Date()
  expire.setDate(expire.getDate() + 90)
  setCookie(
    AFF_STORAGE_KEY,
    referral_code,
    {
      maxAge: 60 * 60 * 24 * 90,
      expires: expire,
      path: '/',
    },
  )
}

export function getToken(): UserToken | undefined {
  const user = getCookie(USER_LOCAL_STORAGE_KEY)
  return user !== undefined
    ? (JSON.parse(user as string) as UserToken)
    : undefined
}

export function getAffCode(): string | undefined {
  const code = getCookie(AFF_STORAGE_KEY)
  return code !== undefined
    ? (code as string)
    : undefined
}

export function removeUser(): void {
  deleteCookie(USER_LOCAL_STORAGE_KEY)
}
