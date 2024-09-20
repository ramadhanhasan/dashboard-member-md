import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

const useFilterParams = (paramNames?: string[]): Record<string, string> => {
  const params = useSearchParams()

  const filterParams = useMemo(() => {
    if (params && paramNames) {
      const filteredParams: Record<string, string> = {}
      paramNames
        .filter(p => params.has(p))
        .forEach(p => {
          filteredParams[`${p}`] = decodeURIComponent(params.get(p)!)
        })
      return filteredParams
    }
    return {}
  }, [paramNames, params])

  return filterParams
}

export default useFilterParams
