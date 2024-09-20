import { RouteENUM } from '../constants/data'
import fetchConstructor from './fecthConstructor'

export const handleMediaDocUpload = async (file: File) => {
  const res = await fetchConstructor<string, { file: File }>({
    path: RouteENUM.UPLOAD +'doc',
    method: 'post',
    body: {
      file,
    },
    isFormData: true,
  })

  return res.data.data
}