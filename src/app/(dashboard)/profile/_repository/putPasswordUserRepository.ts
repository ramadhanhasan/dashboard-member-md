import fetchConstructor from '@/utils/fecthConstructor';
import { RouteENUM } from '../../../../constants/data';
import { IChangePassword } from '../_interfaces';

const putPasswordUserRepository = async ({
  body
}: {
  body: IChangePassword;
}) => {
  const res = await fetchConstructor<IChangePassword, IChangePassword>({
    method: 'put',
    path: RouteENUM.USERS + 'password',
    body,
    withAuth: true
  });

  return res.data.data;
};

export default putPasswordUserRepository;
