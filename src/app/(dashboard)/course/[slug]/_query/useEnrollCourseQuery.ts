import { notification } from 'antd'
import { useMutation } from '@tanstack/react-query'
import putEnrollCourse from '../_repository/putEnrollCourse'
import { ResponseWrapper } from '../../../../../types/fetch'

const useEnrollCourseQuery = (onSuccess = () => {}) => {
  return useMutation({
    mutationFn: putEnrollCourse,
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

export default useEnrollCourseQuery
