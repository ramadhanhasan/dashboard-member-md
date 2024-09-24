import { useQuery, useQueryClient } from '@tanstack/react-query'
import getDetailRepository from '../_repository/getDetailProductRepository'

const useGetDetailProductQuery
 = (slug: string) => {
  const queryClient = useQueryClient()
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: [`get-product-detail-${slug}`],
    queryFn: () => getDetailRepository(slug),
  })

  return {
    data: data?.data ?? null,
    isLoading: isFetching,
    isError: error,
    refetchData: refetch,
    invalidateData: () =>
      queryClient.invalidateQueries({
        queryKey: [`get-product-detail-${slug}`],
      }),
  }
}

export default useGetDetailProductQuery;