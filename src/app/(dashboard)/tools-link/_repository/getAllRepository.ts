import fetchConstructor from '@/utils/fecthConstructor'

import { ITools } from '../_interfaces'
import { PaginationParamType } from '../../../../types/fetch'
import { RouteENUM } from '../../../../constants/data'

const getAllRepository = async (params?: PaginationParamType) => {
  const res = await fetchConstructor<ITools[]>({
    path: RouteENUM.TOOLS,
    body: params,
    withAuth: true,
  })

  return res.data
}

export default getAllRepository
