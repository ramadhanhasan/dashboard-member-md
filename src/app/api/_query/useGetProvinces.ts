import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { PaginationParamType } from '@/types/fetch'

import { paginationQueryKey } from '@/utils/paginationQueryKey'
import getProvinces from '../_repository/getProvinces'

const useGetProvincesQuery = (params?: PaginationParamType) => {
  const queryClient = useQueryClient()
  const queryKey = paginationQueryKey('provinces', params)

  const { isFetching, error, data, refetch } = useQuery({
    queryKey,
    queryFn: () => getProvinces(params),
    enabled: true
  })

  return {
    dataProvinces: data?.data ?? [],
    currentPageProvinces: data?.pagination?.page ?? 1,
    totalItemProvinces: data?.pagination?.total ?? 0,
    totalPageProvinces: data?.pagination?.total_page ?? 1,
    isLoadingProvinces: isFetching,
    isErrorProvinces: error,
    refetechDataProvinces: refetch,
    invalidateDataProvinces: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),
  }
}

export default useGetProvincesQuery;
