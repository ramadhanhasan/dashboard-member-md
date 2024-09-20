import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { PaginationParamType } from '@/types/fetch'

import { paginationQueryKey } from '@/utils/paginationQueryKey'
import getAllRepository from '../_repository/getAllRepository'

const useGetAllQuery = (params?: PaginationParamType) => {
  const queryClient = useQueryClient()
  const queryKey = paginationQueryKey('events', params)

  const { isFetching, error, data, refetch } = useQuery({
    queryKey,
    queryFn: () => getAllRepository(params),
  })

  return {
    dataEvent: data?.data ?? [],
    currentPageEvent: data?.pagination?.page ?? 1,
    totalItemEvent: data?.pagination?.total ?? 0,
    totalPageEvent: data?.pagination?.total_page ?? 1,
    isLoadingEvent: isFetching,
    isErrorEvent: error,
    refetechDataEvent: refetch,
    invalidateDataEvent: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),
  }
}

export default useGetAllQuery;
