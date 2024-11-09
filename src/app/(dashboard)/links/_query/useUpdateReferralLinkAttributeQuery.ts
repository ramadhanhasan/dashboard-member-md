import { notification } from 'antd'
import { useMutation } from '@tanstack/react-query'
import putReferralLinkAttributeRepository from '../_repository/putReferralLinkAttributeRepository'
import { ResponseWrapper } from '../../../../types/fetch'

const useUpdateReferralLinkAttributeQuery = (onSuccess = () => {}) => {
  return useMutation({
    mutationFn: putReferralLinkAttributeRepository,
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

export default useUpdateReferralLinkAttributeQuery
