import { PaginationParamType } from '@/types/fetch'

export const paginationQueryKey = (
  key: string,
  params?: PaginationParamType,
  extraParam?: string,
) => {
  return [
    `get-${key}-data-${params?.page ?? 1}-${params?.limit ?? 10}-${
      JSON.stringify(params?.filterParams) ?? 'filterParams'
    }-${
      params?.sortParams
        ? `${params.sortParams.sort}:${params.sortParams.order}`
        : '-sortparam'
    }-startdate-${params?.['dateRange[0]'] ?? 'dateRange[0]'}-enddate-${
      params?.['dateRange[1]'] ?? 'dateRange[1]'
    }` + extraParam,
  ]
}
