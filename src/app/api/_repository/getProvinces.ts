import fetchConstructor from '@/utils/fecthConstructor'
import { RouteENUM } from '../../../constants/data'
import { PaginationParamType } from '../../../types/fetch'
import { IProvince } from '../_interfaces/provinces.interface'

const getProvinces = async (params?: PaginationParamType) => {
  const res = await fetchConstructor<IProvince[]>({
    path: RouteENUM.PROVINCES,
    method: 'get',
    body: params,
    withAuth: false,
  })
  
  return res.data
}

export default getProvinces
