import fetchConstructor from '@/utils/fecthConstructor'
import { ICourse } from '../../_interfaces'
import { RouteENUM } from '../../../../../constants/data'

const getDetailRepository = async (slug: string) => {
  const res = await fetchConstructor<ICourse>({
    path: RouteENUM.COURSE + slug,
  })

  return res.data
}

export default getDetailRepository
