import { useQuery, useQueryClient } from '@tanstack/react-query'
import getDetailOrderRepository from '../_repository/getDetailOrderRepository'

const useGetDetailOrderQuery
 = (order_number: string) => {
  const queryClient = useQueryClient()
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: [`get-order-guest-detail-${order_number}`],
    queryFn: () => getDetailOrderRepository(order_number),
    enabled: true
  })
  
  return {
    data: data?.data ?? null,
    isLoading: isFetching,
    isError: error,
    refetchData: refetch,
    invalidateData: () =>
      queryClient.invalidateQueries({
        queryKey: [`get-order-guest-detail-${order_number}`],
      }),
  }
}

export default useGetDetailOrderQuery;