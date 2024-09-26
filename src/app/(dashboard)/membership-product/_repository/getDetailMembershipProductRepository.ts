import fetchConstructor from '@/utils/fecthConstructor'
import { IMembershipProduct } from '../_interfaces'
import { RouteENUM } from '../../../../constants/data'

const getDetailRepository = async (slug: string) => {
  const res = await fetchConstructor<IMembershipProduct>({
    path: RouteENUM.MEMBERSHIP + slug,
    withAuth: true
  })

  return res.data
}

export default getDetailRepository
