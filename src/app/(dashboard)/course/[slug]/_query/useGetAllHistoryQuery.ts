import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { PaginationParamType } from '@/types/fetch'

import { paginationQueryKey } from '@/utils/paginationQueryKey'
import getAllHistoryRepository from '../_repository/getAllHistoryRepository'

const useGetAllHistoryQuery = (params?: PaginationParamType) => {
  const queryClient = useQueryClient()
  const queryKey = paginationQueryKey('history-lesson', params)

  const { isFetching, error, data, refetch } = useQuery({
    queryKey,
    queryFn: () => getAllHistoryRepository(params),
  })

  return {
    dataHistoryLesson: data?.data ?? [],
    currentPageHistoryLesson: data?.pagination?.page ?? 1,
    totalItemHistoryLesson: data?.pagination?.total ?? 0,
    totalPageHistoryLesson: data?.pagination?.total_page ?? 1,
    isLoadingHistoryLesson: isFetching,
    isErrorHistoryLesson: error,
    refetechDataHistoryLesson: refetch,
    invalidateDataHistoryLesson: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),
  }
}

export default useGetAllHistoryQuery;
