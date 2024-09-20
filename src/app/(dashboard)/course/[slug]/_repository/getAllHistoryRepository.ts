import fetchConstructor from '@/utils/fecthConstructor'
import { PaginationParamType } from '../../../../../types/fetch'
import { RouteENUM } from '../../../../../constants/data'
import { ILessonHistory } from '../../_interfaces'


const getAllHistoryRepository = async (params?: PaginationParamType) => {
  const res = await fetchConstructor<ILessonHistory[]>({
    path: RouteENUM.LESSONS + 'history',
    body: params,
    withAuth: true,
  })

  return res.data
}

export default getAllHistoryRepository
