import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { PaginationParamType } from '@/types/fetch'

import { paginationQueryKey } from '@/utils/paginationQueryKey'
import getAllRepository from '../_repository/getAllRepository'

const useGetAllQuery = (params?: PaginationParamType) => {
  const queryClient = useQueryClient()
  const queryKey = paginationQueryKey('leads', params)

  const { isFetching, error, data, refetch } = useQuery({
    queryKey,
    queryFn: () => getAllRepository(params),
  })

  return {
    dataLeads: data?.data ?? [],
    currentPageLeads: data?.pagination?.page ?? 1,
    totalItemLeads: data?.pagination?.total ?? 0,
    totalPageLeads: data?.pagination?.total_page ?? 1,
    isLoadingLeads: isFetching,
    isErrorLeads: error,
    refetechDataLeads: refetch,
    invalidateDataLeads: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),
  }
}

export default useGetAllQuery;
