import fetchConstructor from '@/utils/fecthConstructor'
import { ILesson } from '../../../../_interfaces'
import { RouteENUM } from '../../../../../../../constants/data'

const getDetailRepositoryLesson = async (slug: string, chapter: string, lesson: string) => {
  const res = await fetchConstructor<ILesson>({
    path: RouteENUM.LESSONS + `${slug}/${chapter}/${lesson}`,
  })

  return res.data
}

export default getDetailRepositoryLesson
