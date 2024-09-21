import fetchConstructor from '@/utils/fecthConstructor'
import { IReferralLink } from '../../(dashboard)/links/_interfaces'
import { RouteENUM } from '../../../constants/data'

const getOneLinkRepository = async (id: number, type: string) => {
  const res = await fetchConstructor<IReferralLink>({
    path: RouteENUM.REFERRAL_LINK + type + '/' + id,
    withAuth: false
  })

  return res.data
}

export default getOneLinkRepository
