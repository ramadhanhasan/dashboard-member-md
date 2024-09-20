import fetchConstructor from '@/utils/fecthConstructor'
import { RouteENUM } from '../../../../constants/data'

interface UserFormData {
  email: string
  password: string
}

type LoginResponseType = {
  accessToken: string
  refreshToken: string
}

const postSignIn = async (user: UserFormData) => {
  const res = await fetchConstructor<LoginResponseType, UserFormData>({
    path: RouteENUM.AUTH + '/login',
    method: 'post',
    body: user,
    withAuth: false,
  })
  
  return res.data.data
}

export default postSignIn
