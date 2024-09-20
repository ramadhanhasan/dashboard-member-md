import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { PaginationParamType } from '@/types/fetch'

import { paginationQueryKey } from '@/utils/paginationQueryKey'
import getAllRepository from '../_repository/getAllRepository'

const useGetAllQuery = (params?: PaginationParamType) => {
  const queryClient = useQueryClient()
  const queryKey = paginationQueryKey('courses', params)

  const { isFetching, error, data, refetch } = useQuery({
    queryKey,
    queryFn: () => getAllRepository(params),
  })

  return {
    dataCourse: data?.data ?? [],
    currentPageCourse: data?.pagination?.page ?? 1,
    totalItemCourse: data?.pagination?.total ?? 0,
    totalPageCourse: data?.pagination?.total_page ?? 1,
    isLoadingCourse: isFetching,
    isErrorCourse: error,
    refetechDataCourse: refetch,
    invalidateDataCourse: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),
  }
}

export default useGetAllQuery;
