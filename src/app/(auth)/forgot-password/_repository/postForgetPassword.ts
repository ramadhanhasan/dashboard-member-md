import fetchConstructor from '@/utils/fecthConstructor'
import { RouteENUM } from '../../../../constants/data'

interface UserForgotPasswordData {
  email: string
}

const postForgetPassword = async (body: UserForgotPasswordData) => {
  const res = await fetchConstructor<boolean, UserForgotPasswordData>({
    path: RouteENUM.USERS + 'forgot-password',
    method: 'post',
    body,
    withAuth: false,
  })
  
  return res.data.data
}

export default postForgetPassword
