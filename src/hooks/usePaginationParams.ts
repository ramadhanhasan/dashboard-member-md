import { useSearchParams } from 'next/navigation'

const usePaginationParam = () => {
  const params = useSearchParams()

  const limitParam = parseInt(params?.get('limit') ?? '10')
  const pageParam = parseInt(params?.get('page') ?? '1')
  const paginationParams = {
    limit: limitParam,
    page: pageParam,
  }

  return paginationParams
}

export default usePaginationParam
