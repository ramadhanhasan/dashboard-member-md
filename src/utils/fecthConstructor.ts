import { AxiosRequestConfig } from 'axios'

import querystring from 'querystring'

import axiosClient from './axiosClient'
import { formDataBuilder } from './formDataBuilder'
import { getToken } from './userUtils'
import { FetchContructorParams, ResponseWrapper } from '@/types/fetch'

const fetchConstructor = async <ResponseT, InputT = unknown>({
  method = 'get',
  path,
  headers,
  body,
  withAuth = true,
  isFormData = false,
}: FetchContructorParams<InputT>) => {
  let token
  let data
  let queryParams

  if (withAuth) {
    token = await getToken()
    if (token === undefined) window.location.href = '/login'
  }

  if (isFormData) {
    const formData = new FormData()
    formDataBuilder(formData, body)
    data = formData
  } else if (['get', 'delete'].includes(method) && body) {
    const { sortParams, filterParams, ...params } = body
    
    queryParams = {
      ...(params as InputT),
      ...(sortParams
        ? { sort: `${sortParams.sort}`, order: `${sortParams.order}` }
        : {}),
      ...(filterParams
        ? Object.keys(filterParams)
            .filter(key => filterParams[key] !== '')
            .map(key => `${key}:${filterParams[key]}`)
            .reduce(
              (prev, param, index) => ({
                ...prev,
                [param.split(':')[0]]: param.split(':')[1],
              }),
              {},
            )
        : {}),
    }
  } else {
    data = JSON.stringify(body)
  }

  const reqConfig: AxiosRequestConfig = {
    headers: {
      ...headers,
      ...(withAuth && {
        Authorization: `Bearer ${token?.accessToken}`,
      }),
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
    },
  }

  return await (['get', 'delete'].includes(method)
    ? axiosClient[method]<ResponseWrapper<ResponseT>>(
        path + (queryParams ? `?${querystring.stringify(queryParams)}` : ''),
        reqConfig,
      )
    : axiosClient[method]<ResponseWrapper<ResponseT>>(path, data, reqConfig))
}

export default fetchConstructor
