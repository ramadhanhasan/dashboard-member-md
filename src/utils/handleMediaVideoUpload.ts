import { RouteENUM } from '../constants/data'
import fetchConstructor from './fecthConstructor'

export const handleMediaVideoUpload = async (file: File) => {
  const res = await fetchConstructor<string, { file: File }>({
    path: RouteENUM.UPLOAD +'video',
    method: 'post',
    body: {
      file,
    },
    isFormData: true,
  })

  return res.data.data
}