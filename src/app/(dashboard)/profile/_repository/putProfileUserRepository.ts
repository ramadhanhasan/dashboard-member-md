import fetchConstructor from '@/utils/fecthConstructor';
import { RouteENUM } from '../../../../constants/data';
import { IUser } from '../_interfaces';

const putProfileUserRepository = async ({
  body
}: {
  body: IUser;
}) => {
  const res = await fetchConstructor<IUser, IUser>({
    method: 'put',
    path: RouteENUM.USERS,
    body,
    withAuth: true
  });

  return res.data.data;
};

export default putProfileUserRepository;
