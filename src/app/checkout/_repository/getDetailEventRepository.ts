import fetchConstructor from '@/utils/fecthConstructor'
import { RouteENUM } from '../../../constants/data'
import { IEvent } from '../../(dashboard)/event/_interfaces'

const getDetailEventRepository = async (slug: string) => {
  const res = await fetchConstructor<IEvent>({
    path: RouteENUM.EVENT + slug,
    withAuth: false
  })

  return res.data
}

export default getDetailEventRepository
