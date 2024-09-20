import axios from 'axios'

const handleAxiosError = (error: unknown, onError: (error: string) => void) => {
  console.error(error)
  if (axios.isAxiosError(error)) {
    onError(error.response?.data.message)
  }
}

export default handleAxiosError
