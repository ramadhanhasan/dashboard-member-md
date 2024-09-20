import { notification } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { ResponseWrapper } from '../../../../types/fetch'
import putPasswordUserRepository from '../_repository/putPasswordUserRepository'

const usePutPasswordQuery = (onSuccess = () => {}) => {
  return useMutation({
    mutationFn: putPasswordUserRepository,
    onSuccess: () => onSuccess(),
    onError: (err: ResponseWrapper<null>) => {
      notification.error({
        message: Array.isArray(err.error)
          ? err.error.join(', ')
          : err.error,
      })
    },
  })
}

export default usePutPasswordQuery
