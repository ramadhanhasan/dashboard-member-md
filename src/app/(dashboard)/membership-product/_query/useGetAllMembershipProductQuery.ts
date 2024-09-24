import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { PaginationParamType } from '@/types/fetch'

import { paginationQueryKey } from '@/utils/paginationQueryKey'
import getAllRepository from '../_repository/getAllMembershipProductRepository'

const useGetAllMembershipProductQuery = (params?: PaginationParamType) => {
  const queryClient = useQueryClient()
  const queryKey = paginationQueryKey('memberships', params)

  const { isFetching, error, data, refetch } = useQuery({
    queryKey,
    queryFn: () => getAllRepository(params),
  })

  return {
    dataMembershipProduct: data?.data ?? [],
    currentPageMembershipProduct: data?.pagination?.page ?? 1,
    totalItemMembershipProduct: data?.pagination?.total ?? 0,
    totalPageMembershipProduct: data?.pagination?.total_page ?? 1,
    isLoadingMembershipProduct: isFetching,
    isErrorMembershipProduct: error,
    refetechDataMembershipProduct: refetch,
    invalidateDataMembershipProduct: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),
  }
}

export default useGetAllMembershipProductQuery;
