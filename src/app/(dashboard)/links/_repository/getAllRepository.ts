import fetchConstructor from '@/utils/fecthConstructor'

import { IReferralLink } from '../_interfaces'
import { PaginationParamType } from '../../../../types/fetch'
import { RouteENUM } from '../../../../constants/data'

const getAllRepository = async (params?: PaginationParamType) => {
  const res = await fetchConstructor<IReferralLink[]>({
    path: RouteENUM.REFERRAL_LINK,
    body: params,
    withAuth: true,
  })

  return res.data
}

export default getAllRepository
