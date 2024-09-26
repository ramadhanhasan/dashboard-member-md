import fetchConstructor from '@/utils/fecthConstructor'
import { RouteENUM } from '../../../constants/data'
import { IOrder } from '../_interfaces'

const getDetailOrderRepository = async (order_number: string) => {
  const res = await fetchConstructor<IOrder>({
    path: RouteENUM.ORDERS + 'sales/' + order_number,
    withAuth: false
  })

  return res.data
}

export default getDetailOrderRepository
