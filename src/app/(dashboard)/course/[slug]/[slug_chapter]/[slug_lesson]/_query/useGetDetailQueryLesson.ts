import { useQuery, useQueryClient } from '@tanstack/react-query'
import getDetailRepositoryLesson from '../_repository/getDetailRepositoryLesson'

const useGetDetailQueryLesson
 = (slug: string, chapter: string, lesson: string) => {
  const queryClient = useQueryClient()
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: [`get-lesson-detail-${slug}`],
    queryFn: () => getDetailRepositoryLesson(slug, chapter, lesson),
    enabled: true
  })

  return {
    data: data?.data ?? null,
    isLoading: isFetching,
    isError: error,
    refetchData: refetch,
    invalidateData: () =>
      queryClient.invalidateQueries({
        queryKey: [`get-lesson-detail-${slug}`],
      }),
  }
}

export default useGetDetailQueryLesson;