import fetchConstructor from '@/utils/fecthConstructor'
import { RouteENUM } from '../../../constants/data'
import { IMembershipProduct } from '../../(dashboard)/membership-product/_interfaces'

const getDetailMembershipRepository = async (slug: string) => {
  const res = await fetchConstructor<IMembershipProduct>({
    path: RouteENUM.MEMBERSHIP + slug,
    withAuth: false
  })

  return res.data
}

export default getDetailMembershipRepository
