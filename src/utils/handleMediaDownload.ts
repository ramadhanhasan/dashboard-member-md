import { getToken } from './userUtils'

export const handleMediaDownload = async (path: string) => {
  const token = await getToken()

  const anchor = document.createElement('a')
  document.body.appendChild(anchor)

  const headers = new Headers()
  headers.append('Authorization', `Bearer ${token?.accessToken}`)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}file/${path}`, {
      headers,
    })
    const blobby = await response.blob()
    const objectUrl = window.URL.createObjectURL(blobby)

    anchor.href = objectUrl
    anchor.download = path
    anchor.click()

    window.URL.revokeObjectURL(objectUrl)
  } catch (error) {
    console.log(error)
  }
}
