import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { PaginationParamType } from '@/types/fetch'

import { paginationQueryKey } from '@/utils/paginationQueryKey'
import getAllRepository from '../_repository/getAllRepository'

const useGetAllQuery = (params?: PaginationParamType) => {
  const queryClient = useQueryClient()
  const queryKey = paginationQueryKey('tools', params)

  const { isFetching, error, data, refetch } = useQuery({
    queryKey,
    queryFn: () => getAllRepository(params),
  })

  return {
    dataTool: data?.data ?? [],
    currentPageTool: data?.pagination?.page ?? 1,
    totalItemTool: data?.pagination?.total ?? 0,
    totalPageTool: data?.pagination?.total_page ?? 1,
    isLoadingTool: isFetching,
    isErrorTool: error,
    refetechDataTool: refetch,
    invalidateDataTool: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),
  }
}

export default useGetAllQuery;
