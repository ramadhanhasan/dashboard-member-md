"use client";

import { notification } from 'antd'
import { useMutation } from '@tanstack/react-query'
import postCreateOrderMembership from '../_repository/postCreateOrderMembershipRepository'
import { ResponseWrapper } from '../../../types/fetch'
import { deleteCookie } from 'cookies-next'
import { AFF_STORAGE_KEY, FUNNEL_STORAGE_KEY, UTM_PIXEL_META } from '../../../constants/data'
import { useRouter } from 'next/navigation'

const useCreateOrderMembershipQuery = ({}) => {
  const router = useRouter();
  return useMutation({
    mutationFn: postCreateOrderMembership,
    onSuccess: (data) => {
      const domain = '.'+process.env.NEXT_PUBLIC_DOMAIN;
      deleteCookie(AFF_STORAGE_KEY, {
        domain,
        path: '/',       // Path for which the cookie is valid
        sameSite: 'none',  // Control cross-site request behavior
        secure: true,
      });
      deleteCookie(FUNNEL_STORAGE_KEY, {
        domain,
        path: '/',       // Path for which the cookie is valid
        sameSite: 'none',  // Control cross-site request behavior
        secure: true,
      });
      deleteCookie(UTM_PIXEL_META, {
        domain,
        path: '/',       // Path for which the cookie is valid
        sameSite: 'none',  // Control cross-site request behavior
        secure: true,
      });
      // return data;
      router.refresh();
      router.replace('/checkout/success/'+data.order_number)
    },
    onError: (err: ResponseWrapper<null>) => {
      console.log(err);
      
      notification.error({
        message: Array.isArray(err.error)
          ? err.error.join(', ')
          : err.error,
      })
    },
  })
}

export default useCreateOrderMembershipQuery
