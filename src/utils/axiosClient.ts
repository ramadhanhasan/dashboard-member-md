import axios from 'axios'
import { removeUser } from './userUtils'
import { notification } from 'antd'

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
})
// Change response data/error here
Axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 500)) {
      notification.open({
        message: error?.response.data?.error ?? 'Something wrong with the service, please contact admin!',
        type: 'error',
      })
    }

    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403)
    ) {
      removeUser()
      window.location.href = '/'
    }

    return Promise.reject(
      error?.response?.data ?? {
        message: 'Something wrong with the service, please contact admin!',
      },
    )
  },
)

export default Axios
