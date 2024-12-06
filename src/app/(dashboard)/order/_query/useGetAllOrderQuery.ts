import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { PaginationParamType } from '@/types/fetch'

import { paginationQueryKey } from '@/utils/paginationQueryKey'
import getAllOrderRepository from '../_repository/getAllOrderRepository'

const useGetAllOrderQuery = (params?: PaginationParamType) => {
  const queryClient = useQueryClient()
  const queryKey = paginationQueryKey('orders', params)

  const { isFetching, error, data, refetch } = useQuery({
    queryKey,
    queryFn: () => getAllOrderRepository(params),
  })

  return {
    dataOrders: data?.data ?? [],
    currentPageOrders: data?.pagination?.page ?? 1,
    totalItemOrders: data?.pagination?.total ?? 0,
    totalPageOrders: data?.pagination?.total_page ?? 1,
    isLoadingOrders: isFetching,
    isErrorOrders: error,
    refetechDataOrders: refetch,
    invalidateDataOrders: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),
  }
}

export default useGetAllOrderQuery;
