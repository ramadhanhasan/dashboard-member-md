import { useQuery, useQueryClient } from '@tanstack/react-query'
import getDetailRepository from '../_repository/getDetailMembershipProductRepository'

const useGetDetailMembershipProductQuery
 = (slug: string) => {
  const queryClient = useQueryClient()
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: [`get-membership-detail-${slug}`],
    queryFn: () => getDetailRepository(slug),
  })

  return {
    data: data?.data ?? null,
    isLoading: isFetching,
    isError: error,
    refetchData: refetch,
    invalidateData: () =>
      queryClient.invalidateQueries({
        queryKey: [`get-membership-detail-${slug}`],
      }),
  }
}

export default useGetDetailMembershipProductQuery;