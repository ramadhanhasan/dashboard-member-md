import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { PaginationParamType } from '@/types/fetch'

import { paginationQueryKey } from '@/utils/paginationQueryKey'
import getAllRepository from '../_repository/getAllRepository'

const useGetAllQuery = (params?: PaginationParamType) => {
  const queryClient = useQueryClient()
  const queryKey = paginationQueryKey('links', params)

  const { isFetching, error, data, refetch } = useQuery({
    queryKey,
    queryFn: () => getAllRepository(params),
  })

  return {
    dataReferralLinks: data?.data ?? [],
    currentPageReferralLinks: data?.pagination?.page ?? 1,
    totalItemReferralLinks: data?.pagination?.total ?? 0,
    totalPageReferralLinks: data?.pagination?.total_page ?? 1,
    isLoadingReferralLinks: isFetching,
    isErrorReferralLinks: error,
    refetechDataReferralLinks: refetch,
    invalidateDataReferralLinks: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),
  }
}

export default useGetAllQuery;
