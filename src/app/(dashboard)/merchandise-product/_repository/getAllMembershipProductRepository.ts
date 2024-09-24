import fetchConstructor from '@/utils/fecthConstructor'

import { IMembershipProduct } from '../_interfaces'
import { PaginationParamType } from '../../../../types/fetch'
import { RouteENUM } from '../../../../constants/data'

const getAllRepository = async (params?: PaginationParamType) => {
  const res = await fetchConstructor<IMembershipProduct[]>({
    path: RouteENUM.MEMBERSHIP,
    body: params,
    withAuth: true,
  })

  return res.data
}

export default getAllRepository
