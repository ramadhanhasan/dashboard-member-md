import { useQuery, useQueryClient } from '@tanstack/react-query'
import getDetailRepository from '../_repository/getDetailRepository'

const useGetDetailQuery
 = () => {
  const queryClient = useQueryClient()
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: [`get-user-detail`],
    queryFn: () => getDetailRepository(),
    enabled: false
  })

  return {    
    data: data?.data ?? null,
    isLoading: isFetching,
    isError: error,
    refetchData: refetch,
    invalidateData: () =>
      queryClient.invalidateQueries({
        queryKey: [`get-user-detail`],
      }),
  }
}

export default useGetDetailQuery;