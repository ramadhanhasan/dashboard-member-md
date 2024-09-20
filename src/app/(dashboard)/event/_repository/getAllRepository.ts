import fetchConstructor from '@/utils/fecthConstructor'

import { IEvent } from '../_interfaces'
import { PaginationParamType } from '../../../../types/fetch'
import { RouteENUM } from '../../../../constants/data'

const getAllRepository = async (params?: PaginationParamType) => {
  const res = await fetchConstructor<IEvent[]>({
    path: RouteENUM.EVENT,
    body: params,
    withAuth: true,
  })

  return res.data
}

export default getAllRepository
