import fetchConstructor from '@/utils/fecthConstructor'

import { ICourse } from '../_interfaces'
import { PaginationParamType } from '../../../../types/fetch'
import { RouteENUM } from '../../../../constants/data'

const getAllRepository = async (params?: PaginationParamType) => {
  const res = await fetchConstructor<ICourse[]>({
    path: RouteENUM.COURSE,
    body: params,
    withAuth: true,
  })

  return res.data
}

export default getAllRepository
