'use client'

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'

import type { AuthContextProps, UserToken } from './_interfaces'
import { getToken, removeUser, saveUser } from '@/utils/userUtils'
import useGetUserProfile from './_query/useGetUserProfile'

const defaultAuthContext: AuthContextProps = {
  isAuth: false,
  login: () => {},
  logout: () => {},
}

export const AuthContext = createContext<AuthContextProps>(defaultAuthContext)

const AuthProvider = ({ children }: PropsWithChildren) => {
  const publicUrl = useMemo(() => { return ['signin', 'verified', 'forgot-password', 'forgot-password/success', 'reset-password', 'lp', 'checkout']; }, [])
  const pathname = usePathname()
  const isAuth = pathname?.includes('/')
  const router = useRouter()
  const {
    userProfile,
    loadingUserProfile,
    errorUserProfile,
    invalidateUserProfile,
    refetchUserProfile,
  } = useGetUserProfile()

  const handleRefetchUserProfile = useCallback(() => {
    refetchUserProfile()
  }, [refetchUserProfile])

  const login = useCallback(
    (userToken: UserToken) => {
      saveUser(userToken) // save token to cookie
      handleRefetchUserProfile()
      router.replace('/')
    },
    [router, handleRefetchUserProfile],
  )

  const logout = useCallback(() => {
    invalidateUserProfile()
    removeUser()
    router.replace('/')
  }, [invalidateUserProfile, router])

  useEffect(() => {
    const token = getToken()    
    if (token) {
      handleRefetchUserProfile()
    } else {
      if (!publicUrl.includes(pathname.split('/')[1]))router.replace('/signin')
    }
  }, [handleRefetchUserProfile, router, publicUrl, pathname])

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        isAuth: userProfile != undefined,
        login,
        logout,
      }}
    >

      {!loadingUserProfile &&
        !errorUserProfile &&
        (isAuth || userProfile) &&
        children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
