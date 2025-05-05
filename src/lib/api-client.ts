import axios from "axios"
import type { AxiosInstance, AxiosResponse, AxiosError } from "axios"
import { getSession } from "next-auth/react"

const baseURL = process.env.NEXT_PUBLIC_API_URL || "/api"

const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    // Get session from Next-Auth
    const session = await getSession()
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Redirect to login on auth error
      window.location.href = "/api/auth/signin?callbackUrl=" + encodeURIComponent(window.location.href)
    }
    return Promise.reject(error)
  },
)

export default apiClient

