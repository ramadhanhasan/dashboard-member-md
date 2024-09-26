import { useQuery, useQueryClient } from '@tanstack/react-query'
import getDetailMembershipRepository from '../_repository/getDetailMembershipRepository'

const useGetDetailMembershipQuery
 = (slug: string) => {
  const queryClient = useQueryClient()
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: [`get-membership-guest-detail-${slug}`],
    queryFn: () => getDetailMembershipRepository(slug),
    enabled: true
  })
  
  return {
    data: data?.data ?? null,
    isLoading: isFetching,
    isError: error,
    refetchData: refetch,
    invalidateData: () =>
      queryClient.invalidateQueries({
        queryKey: [`get-membership-guest-detail-${slug}`],
      }),
  }
}

export default useGetDetailMembershipQuery;