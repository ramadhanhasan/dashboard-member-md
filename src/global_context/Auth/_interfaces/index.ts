export interface User {
  name: string
  email: string
  img: string
}

export interface LoginData {
  email: string
  password: string
}

export interface UserToken {
  accessToken: string
  refreshToken: string
}

export interface UserProfile {
  id: string
  username: string,
  name: string,
  email: string,
  avatar: string,
}

export interface AuthContextProps {
  token?: UserToken
  userProfile?: UserProfile
  isAuth: boolean
  login: (userToken: UserToken) => void
  logout: () => void
}

export interface RequestsResponseType extends UserProfile {}
