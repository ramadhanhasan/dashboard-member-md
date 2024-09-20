import fetchConstructor from '@/utils/fecthConstructor'

import { RequestsResponseType } from '../_interfaces'
import { RouteENUM } from '../../../constants/data'

const getUserProfile = async () => {
  const res = await fetchConstructor<RequestsResponseType>({
    path: RouteENUM.AUTH + '/me',
    withAuth: true
  })

  return res.data
}

export default getUserProfile
