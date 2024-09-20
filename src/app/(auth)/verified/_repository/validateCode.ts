import fetchConstructor from '@/utils/fecthConstructor'
import { RouteENUM } from '../../../../constants/data'
import { IUserVerified } from '../_interfaces'

interface IActivationCodeReq {
  id: string | null
  code: string | null
}

const validateCode = async (params: IActivationCodeReq) => {
  const res = await fetchConstructor<IUserVerified, IActivationCodeReq>({
    path: RouteENUM.AUTH + '/validate/activation-code/' + params.id + '/' + params.code,
    method: 'get',
    withAuth: false,
  })
  
  return res.data.data
}

export default validateCode


