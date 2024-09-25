import { notification } from 'antd'
import { useMutation } from '@tanstack/react-query'
import putVerifiedUser from '../_repository/verifiedUser'
import { ResponseWrapper } from '../../../../types/fetch'

const useVerifiedUserQuery = (onSuccess = () => {}) => {
  return useMutation({
    mutationFn: putVerifiedUser,
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

export default useVerifiedUserQuery
