import fetchConstructor from '@/utils/fecthConstructor'
import { IProduct } from '../_interfaces'
import { RouteENUM } from '../../../../constants/data'

const getDetailRepository = async (slug: string) => {
  const res = await fetchConstructor<IProduct>({
    path: RouteENUM.PRODUCT + slug,
  })

  return res.data
}

export default getDetailRepository
