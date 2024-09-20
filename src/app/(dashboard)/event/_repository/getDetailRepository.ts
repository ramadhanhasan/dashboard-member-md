import fetchConstructor from '@/utils/fecthConstructor'
import { IEvent } from '../_interfaces'
import { RouteENUM } from '../../../../constants/data'

const getDetailRepository = async (id: string) => {
  const res = await fetchConstructor<IEvent>({
    path: RouteENUM.EVENT + id,
  })

  return res.data
}

export default getDetailRepository
