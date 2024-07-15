import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue3-toastify'

export const useApi = (isAuth = true, handleErrors = true) => {
  const instance = axios.create({
    baseURL: `${isAuth ? import.meta.env.VITE_VUE_APP_Z_DB_URL : import.meta.env.VITE_VUE_APP_Z_AUTH_URL}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(isAuth ? { authorization: `Bearer ${useAuthStore().getToken}` } : {})
    }
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (!handleErrors) {
        return Promise.reject(error)
      }

      switch (error.response.status) {
        case 503:
        case 520:
        case 500:
          toast.error('Something went wrong!')
          break

        case 401:
          window.location.href = '/login'
          break

        case 403:
          window.location.href = `/auth/verify-email`

          break

        case 404:
          window.location.href = `/404`

          break
        case 405:
          toast.error('You have made a bad request')

          break
        case 423: // locked exception
          window.location.href = '/unauthorized'

          break
      }

      return Promise.reject(error)
    }
  )

  return instance
}
