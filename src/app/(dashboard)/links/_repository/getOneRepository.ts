import fetchConstructor from '@/utils/fecthConstructor'
import { RouteENUM } from '../../../../constants/data'
import { IReferralLink } from '../_interfaces'

const getOneLinkRepository = async (id: number, type: string, aff?: string) => {
  const res = await fetchConstructor<IReferralLink>({
    path: RouteENUM.REFERRAL_LINK + type + '/' + id + "?aff="+aff,
    withAuth: false
  })

  return res.data
}

export default getOneLinkRepository
