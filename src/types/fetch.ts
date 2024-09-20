export interface PaginationParamType {
  limit?: number
  page?: number
  sortParams?: { order: string; sort: string }
  filterParams?: Record<string, string>
  'dateRange[0]'?: string
  'dateRange[1]'?: string
}

export interface FetchContructorParams<InputT> {
  method?: 'get' | 'post' | 'delete' | 'put'
  path: string
  headers?: Record<string, string>
  body?: {
    sortParams?: { order: string; sort: string }
    filterParams?: Record<string, string>
  } & InputT
  withAuth?: boolean
  isFormData?: boolean
}

// TODO: will be used as general type response
export interface ResponseWrapper<T> {
  meta : {
    code: number,
    message: string | string[]
  }
  data: T,
  error?: string | string[],
  success?: string | string[],
  pagination?: {
    total: number,
    total_page: number,
    page: number
  }
}
