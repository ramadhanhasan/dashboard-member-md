import { notification } from 'antd'
import { useMutation } from '@tanstack/react-query'
import putCompleteLesson from '../_repository/putCompleteLesson'
import { ResponseWrapper } from '../../../../../../../types/fetch'

const useCompleteLessonQuery = (onSuccess = () => {}) => {
  return useMutation({
    mutationFn: putCompleteLesson,
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

export default useCompleteLessonQuery
