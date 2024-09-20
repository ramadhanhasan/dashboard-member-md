import fetchConstructor from '@/utils/fecthConstructor';
import { RouteENUM } from '../../../../../../../constants/data';

const putCompleteLesson = async ({
  slug, chapter, lesson
}: {
  slug: string;
  chapter: string;
  lesson: string;
}) => {
  const res = await fetchConstructor<any, any>({
    method: 'put',
    path: RouteENUM.LESSONS + `${slug}/${chapter}/${lesson}/complete`,
    withAuth: true
  });

  return res.data.data;
};

export default putCompleteLesson;
