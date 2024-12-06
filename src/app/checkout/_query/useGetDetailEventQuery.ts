import { useQuery, useQueryClient } from '@tanstack/react-query'
import getDetailEventRepository from '../_repository/getDetailEventRepository'

const useGetDetailEventQuery
 = (slug: string) => {
  const queryClient = useQueryClient()
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: [`get-event-guest-detail-${slug}`],
    queryFn: () => getDetailEventRepository(slug),
    enabled: true
  })
  
  return {
    data: data?.data ?? null,
    isLoading: isFetching,
    isError: error,
    refetchData: refetch,
    invalidateData: () =>
      queryClient.invalidateQueries({
        queryKey: [`get-event-guest-detail-${slug}`],
      }),
  }
}

export default useGetDetailEventQuery;