import fetchConstructor from '@/utils/fecthConstructor'

import { IProduct } from '../_interfaces'
import { PaginationParamType } from '../../../../types/fetch'
import { RouteENUM } from '../../../../constants/data'

const getAllRepository = async (params?: PaginationParamType) => {
  const res = await fetchConstructor<IProduct[]>({
    path: RouteENUM.PRODUCT,
    body: params,
    withAuth: true,
  })

  return res.data
}

export default getAllRepository
