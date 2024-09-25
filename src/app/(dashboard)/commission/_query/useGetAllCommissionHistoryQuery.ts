import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { PaginationParamType } from '@/types/fetch'

import { paginationQueryKey } from '@/utils/paginationQueryKey'
import getAllCommissionHistoryRepository from '../_repository/getAllCommissionHistoryRepository'

const useGetAllCommissionHistoryQuery = (params?: PaginationParamType) => {
  const queryClient = useQueryClient()
  const queryKey = paginationQueryKey('commission-history', params)

  const { isFetching, error, data, refetch } = useQuery({
    queryKey,
    queryFn: () => getAllCommissionHistoryRepository(params),
  })

  return {
    dataCommissionHistory: data?.data ?? [],
    currentPageCommissionHistory: data?.pagination?.page ?? 1,
    totalItemCommissionHistory: data?.pagination?.total ?? 0,
    totalPageCommissionHistory: data?.pagination?.total_page ?? 1,
    isLoadingCommissionHistory: isFetching,
    isErrorCommissionHistory: error,
    refetechDataCommissionHistory: refetch,
    invalidateDataCommissionHistory: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),
  }
}

export default useGetAllCommissionHistoryQuery;
