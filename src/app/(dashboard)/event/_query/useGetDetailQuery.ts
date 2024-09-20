import { useQuery, useQueryClient } from '@tanstack/react-query'
import getDetailRepository from '../_repository/getDetailRepository'

const useGetDetailQuery
 = (id: string) => {
  const queryClient = useQueryClient()
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: [`get-event-detail-${id}`],
    queryFn: () => getDetailRepository(id),
    enabled: false
  })

  return {
    data: data?.data ?? null,
    isLoading: isFetching,
    isError: error,
    refetchData: refetch,
    invalidateData: () =>
      queryClient.invalidateQueries({
        queryKey: [`get-event-detail-${id}`],
      }),
  }
}

export default useGetDetailQuery;