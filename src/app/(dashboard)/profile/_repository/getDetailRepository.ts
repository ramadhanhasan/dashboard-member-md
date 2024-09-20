import fetchConstructor from '@/utils/fecthConstructor'
import { RouteENUM } from '../../../../constants/data'
import { IUser } from '../_interfaces'

const getDetailRepository = async () => {
  const res = await fetchConstructor<IUser, IUser>({
    path: RouteENUM.USERS,
    method: 'get',
    withAuth: true
  })

  return res.data.data
}

export default getDetailRepository;
