import fetchConstructor from '@/utils/fecthConstructor'
import { RouteENUM } from '../../../../constants/data'
import { IResetPassword } from '../_interfaces'

interface IActivationCodeReq {
  id: string | null
  code: string | null
}

const validateCode = async (params: IActivationCodeReq) => {
  const res = await fetchConstructor<IResetPassword, IActivationCodeReq>({
    path: RouteENUM.AUTH + '/validate/forgotten-code/' + params.id + '/' + params.code,
    method: 'get',
    withAuth: false,
  })
  
  return res.data.data
}

export default validateCode


