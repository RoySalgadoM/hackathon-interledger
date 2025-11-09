import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
  maxRedirects: 0, // Don't follow redirects automatically
  validateStatus: function (status) {
    // Accept 2xx and 3xx status codes as valid responses
    return status >= 200 && status < 400
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add bearer token if available and not already set
    if (!config.headers.Authorization) {
      const token = localStorage.getItem('authToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    // Generate and add x-request-id UUID v4
    const requestId = uuidv4()
    config.headers['x-request-id'] = config.headers['x-request-id'] || requestId

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle 302 redirect responses specifically
    if (response.status === 302) {
      const redirectUrl = response.headers.location || response.headers.Location

      if (redirectUrl) {
        console.log('302 Redirect detected, redirecting to:', redirectUrl)
        // Perform client-side redirect to avoid CORS issues
        window.location.href = redirectUrl
        // Return a pending promise to prevent further processing
        return new Promise(() => {})
      }
    }

    // Check if response data contains a redirectUrl field
    if (response.data && response.data.redirectUrl) {
      console.log('Redirecting to:', response.data.redirectUrl)
      window.location.href = response.data.redirectUrl
      return new Promise(() => {})
    }

    return response
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data)
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message)
    } else {
      // Something else happened
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
