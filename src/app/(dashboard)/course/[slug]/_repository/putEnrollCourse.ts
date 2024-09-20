import fetchConstructor from '@/utils/fecthConstructor';
import { RouteENUM } from '../../../../../constants/data';

const putEnrollCourse = async ({
  slug
}: {
  slug: string;
}) => {
  const res = await fetchConstructor<any, any>({
    method: 'put',
    path: RouteENUM.COURSE + slug + '/enroll',
    withAuth: true
  });

  return res.data.data;
};

export default putEnrollCourse;
