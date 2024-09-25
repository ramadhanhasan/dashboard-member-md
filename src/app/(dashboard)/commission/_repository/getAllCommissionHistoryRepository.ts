import fetchConstructor from '@/utils/fecthConstructor'

import { IHistoryCommission } from '../_interfaces'
import { PaginationParamType } from '../../../../types/fetch'
import { RouteENUM } from '../../../../constants/data'

const getAllCommissionHistoryRepository = async (params?: PaginationParamType) => {
  const res = await fetchConstructor<IHistoryCommission[]>({
    path: RouteENUM.USERS + 'commissions/history',
    body: params,
    withAuth: true,
  })

  return res.data
}

export default getAllCommissionHistoryRepository
