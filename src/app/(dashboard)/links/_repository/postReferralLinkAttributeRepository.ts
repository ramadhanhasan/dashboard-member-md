import fetchConstructor from '@/utils/fecthConstructor'
import { IReferralLinkAttribute } from '../_interfaces'
import { RouteENUM } from '../../../../constants/data'

const postReferralLinkAttributeRepository = async ({ body }: { body: IReferralLinkAttribute }) => {
  const res = await fetchConstructor<
    IReferralLinkAttribute,
    IReferralLinkAttribute
  >({
    method: 'post',
    path: RouteENUM.REFERRAL_LINK + "pixel",
    body,
  })

  return res.data
}

export default postReferralLinkAttributeRepository
