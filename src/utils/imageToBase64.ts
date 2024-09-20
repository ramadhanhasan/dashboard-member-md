import { getToken } from './userUtils'

const getImageBlob = async (imageId: string) => {
  const token = await getToken()
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${token?.accessToken}`)
  const imgRes = await fetch(`${process.env.NEXT_PUBLIC_API}file/${imageId}`, {
    headers,
  })
  const blob = await imgRes.blob()
  return blob
}

const blobToBase64 = (blob: Blob): Promise<string | null> => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = function () {
      const dataUrl = (reader.result as string) ?? ''
      resolve(dataUrl)
    }
    reader.readAsDataURL(blob)
  })
}

export const getBase64Image = async function (imageId: string) {
  const blob = await getImageBlob(imageId)
  const base64 = await blobToBase64(blob)
  return base64
}
