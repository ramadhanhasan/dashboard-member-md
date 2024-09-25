import { notification } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { ResponseWrapper } from '../../../../types/fetch'
import putResetPasswordUser from '../_repository/resetPasswordUser'

const useResetPasswordUserQuery = (onSuccess = () => {}) => {
  return useMutation({
    mutationFn: putResetPasswordUser,
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

export default useResetPasswordUserQuery
