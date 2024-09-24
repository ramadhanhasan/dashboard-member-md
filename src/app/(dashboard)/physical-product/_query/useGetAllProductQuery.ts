import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { PaginationParamType } from '@/types/fetch'

import { paginationQueryKey } from '@/utils/paginationQueryKey'
import getAllRepository from '../_repository/getAllProductRepository'

const useGetAllProductQuery = (params?: PaginationParamType) => {
  const queryClient = useQueryClient()
  const queryKey = paginationQueryKey('products', params)

  const { isFetching, error, data, refetch } = useQuery({
    queryKey,
    queryFn: () => getAllRepository(params),
  })

  return {
    dataProduct: data?.data ?? [],
    currentPageProduct: data?.pagination?.page ?? 1,
    totalItemProduct: data?.pagination?.total ?? 0,
    totalPageProduct: data?.pagination?.total_page ?? 1,
    isLoadingProduct: isFetching,
    isErrorProduct: error,
    refetechDataProduct: refetch,
    invalidateDataProduct: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),
  }
}

export default useGetAllProductQuery;
