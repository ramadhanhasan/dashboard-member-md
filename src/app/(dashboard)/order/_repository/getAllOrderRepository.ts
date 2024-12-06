import fetchConstructor from '@/utils/fecthConstructor'

import { IOrder } from '../_interfaces'
import { PaginationParamType } from '../../../../types/fetch'
import { RouteENUM } from '../../../../constants/data'

const getAllOrderRepository = async (params?: PaginationParamType) => {
  const res = await fetchConstructor<IOrder[]>({
    path: RouteENUM.ORDERS + 'sales',
    body: params,
    withAuth: true,
  })

  return res.data
}

export default getAllOrderRepository
