import fetchConstructor from '@/utils/fecthConstructor'
import { IEvent } from '../../_interfaces'
import { RouteENUM } from '../../../../../constants/data'

const getDetailRepository = async (slug: string) => {
  const res = await fetchConstructor<IEvent>({
    path: RouteENUM.EVENT + slug,
  })

  return res.data
}

export default getDetailRepository
