import { useQuery, useQueryClient } from '@tanstack/react-query'
import getOneLinkRepository from '../_repository/getOneRepository'

const useGetOneQuery
 = (id: number, type: string) => {
  const queryClient = useQueryClient()
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: [`get-one-link-${id}`],
    queryFn: () => getOneLinkRepository(id, type),
  })

  return {
    data: data?.data ?? null,
    isLoading: isFetching,
    isError: error,
    refetchData: refetch,
    invalidateData: () =>
      queryClient.invalidateQueries({
        queryKey: [`get-one-link-${id}`],
      }),
  }
}

export default useGetOneQuery;