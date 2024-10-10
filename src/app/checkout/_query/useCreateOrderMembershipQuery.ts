"use client";

import { notification } from 'antd'
import { useMutation } from '@tanstack/react-query'
import postCreateOrderMembership from '../_repository/postCreateOrderMembershipRepository'
import { ResponseWrapper } from '../../../types/fetch'
import { deleteCookie } from 'cookies-next'
import { AFF_STORAGE_KEY, FUNNEL_STORAGE_KEY } from '../../../constants/data'
import { useRouter } from 'next/navigation'

const useCreateOrderMembershipQuery = ({}) => {
  const router = useRouter();
  return useMutation({
    mutationFn: postCreateOrderMembership,
    onSuccess: (data) => {
      deleteCookie(AFF_STORAGE_KEY);
      deleteCookie(FUNNEL_STORAGE_KEY);
      router.refresh();
      router.replace('/checkout/success/'+data.order_number)
    },
    onError: (err: ResponseWrapper<null>) => {
      notification.error({
        message: Array.isArray(err.error)
          ? err.error.join(', ')
          : err.error,
      })
    },
  })
}

export default useCreateOrderMembershipQuery
