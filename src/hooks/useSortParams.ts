import { useSearchParams } from 'next/navigation'

const useSortParams = () => {
  const params = useSearchParams()

  const orderParams = params?.get('order') ?? 'DESC'
  const sortByParam = params?.get('sort') ?? 'created_at'
  const sortParams = {
    order: orderParams,
    sort: sortByParam,
  }

  return sortParams
}

export default useSortParams
