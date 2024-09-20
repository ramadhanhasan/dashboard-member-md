import { RouteENUM } from '../constants/data'
import fetchConstructor from './fecthConstructor'

export const handleMediaUpload = async (file: File) => {
  const res = await fetchConstructor<string, { file: File }>({
    path: RouteENUM.UPLOAD +'image',
    method: 'post',
    body: {
      file,
    },
    isFormData: true,
  })

  return res.data.data
}