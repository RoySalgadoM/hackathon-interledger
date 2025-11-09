import axios from 'axios'

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
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

    // Generate and add x-request-id UUID v4 if not already set
    if (!config.headers['x-request-id']) {
      const requestId = crypto.randomUUID()
      config.headers['x-request-id'] = requestId
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
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
