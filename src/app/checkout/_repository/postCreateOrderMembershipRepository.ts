import fetchConstructor from '@/utils/fecthConstructor';
import { IOrder } from '../_interfaces';
import { RouteENUM } from '../../../constants/data';

const postCreateOrderMembership = async ({
  body
}: {
  body: IOrder;
}) => {
  body
  const res = await fetchConstructor<IOrder, IOrder>({
    method: 'post',
    path: RouteENUM.ORDERS +'sales',
    body,
    withAuth: false
  });

  return res.data.data;
};

export default postCreateOrderMembership;
