import fetchConstructor from '@/utils/fecthConstructor';
import { IUserVerified } from '../_interfaces';
import { RouteENUM } from '../../../../constants/data';

const putVerifiedUser = async ({
  id,
  body
}: {
  id: string | null;
  body: IUserVerified;
}) => {
  const res = await fetchConstructor<IUserVerified, IUserVerified>({
    method: 'put',
    path: RouteENUM.USERS + 'profile/verified/' + id,
    body,
    withAuth: false
  });

  return res.data.data;
};

export default putVerifiedUser;
