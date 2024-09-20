import { useQuery, useQueryClient } from '@tanstack/react-query'
import getDetailRepository from '../_repository/getDetailRepository'

const useGetDetailQuery
 = (slug: string) => {
  const queryClient = useQueryClient()
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: [`get-event-detail-${slug}`],
    queryFn: () => getDetailRepository(slug),
    enabled: true
  })

  return {
    data: data?.data ?? null,
    isLoading: isFetching,
    isError: error,
    refetchData: refetch,
    invalidateData: () =>
      queryClient.invalidateQueries({
        queryKey: [`get-event-detail-${slug}`],
      }),
  }
}

export default useGetDetailQuery;