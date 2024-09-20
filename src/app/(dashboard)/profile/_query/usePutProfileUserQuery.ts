import { notification } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { ResponseWrapper } from '../../../../types/fetch'
import putProfileUserRepository from '../_repository/putProfileUserRepository'

const usePutProfileQuery = (onSuccess = () => {}) => {
  return useMutation({
    mutationFn: putProfileUserRepository,
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

export default usePutProfileQuery
