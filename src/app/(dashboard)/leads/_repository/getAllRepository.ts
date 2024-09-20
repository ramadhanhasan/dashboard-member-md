import fetchConstructor from '@/utils/fecthConstructor'

import { IUserLead } from '../_interfaces'
import { PaginationParamType } from '../../../../types/fetch'
import { RouteENUM } from '../../../../constants/data'

const getAllRepository = async (params?: PaginationParamType) => {
  const res = await fetchConstructor<IUserLead[]>({
    path: RouteENUM.LEADS,
    body: params,
    withAuth: true,
  })

  return res.data
}

export default getAllRepository
