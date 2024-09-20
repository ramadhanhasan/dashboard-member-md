import fetchConstructor from '@/utils/fecthConstructor';
import { IResetPassword } from '../_interfaces';
import { RouteENUM } from '../../../../constants/data';

const putResetPasswordUser = async ({
  id,
  body
}: {
  id: string | null;
  body: IResetPassword;
}) => {
  const res = await fetchConstructor<IResetPassword, IResetPassword>({
    method: 'put',
    path: RouteENUM.USERS + 'profile/reset-password/' + id,
    body,
    withAuth: false
  });

  return res.data.data;
};

export default putResetPasswordUser;
