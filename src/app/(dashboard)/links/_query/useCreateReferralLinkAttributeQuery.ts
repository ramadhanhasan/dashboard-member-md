import { notification } from 'antd'
import { useMutation } from '@tanstack/react-query'
import postReferralLinkAttributeRepository from '../_repository/postReferralLinkAttributeRepository'
import { ResponseWrapper } from '../../../../types/fetch'

const useCreateReferralLinkAttributeQuery = (onSuccess = () => {}) => {
  return useMutation({
    mutationFn: postReferralLinkAttributeRepository,
    onSuccess: () => onSuccess(),
    onError: (err: ResponseWrapper<null>) => {
      notification.error({
        message: Array.isArray(err?.error )
          ? err.error.join(', ')
          : err.error,
      })
    },
  })
}

export default useCreateReferralLinkAttributeQuery
