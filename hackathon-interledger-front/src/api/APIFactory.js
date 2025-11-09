import axiosInstance from './axios'
import { transformToParamsString } from './utils'

/**
 * API Factory
 * Factory simplificado para realizar peticiones HTTP
 */
const APIFactory = {
  /**
   * GET request
   * @param {object} payload - { path, query, headers }
   * @returns {Promise}
   */
  async get(payload) {
    const config = {
      headers: { ...payload.headers, 'x-request-id': crypto.randomUUID() },
    }

    // Agregar token si está disponible
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    let { query } = payload
    query = transformToParamsString(query)

    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`${payload.path}${query}`, config)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * POST request
   * @param {object} payload - { path, body, query, headers }
   * @returns {Promise}
   */
  async post(payload) {
    const config = {
      headers: { ...payload.headers, 'x-request-id': crypto.randomUUID() },
    }

    // Agregar token si está disponible
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    let { query } = payload
    query = transformToParamsString(query)

    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`${payload.path}${query}`, payload.body, config)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * PUT request
   * @param {object} payload - { path, body, query, headers }
   * @returns {Promise}
   */
  async put(payload) {
    const config = {
      headers: { ...payload.headers, 'x-request-id': crypto.randomUUID() },
    }

    // Agregar token si está disponible
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    let { query } = payload
    query = transformToParamsString(query)

    return new Promise((resolve, reject) => {
      axiosInstance
        .put(`${payload.path}${query}`, payload.body, config)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * PATCH request
   * @param {object} payload - { path, body, query, headers }
   * @returns {Promise}
   */
  async patch(payload) {
    const config = {
      headers: { ...payload.headers, 'x-request-id': crypto.randomUUID() },
    }

    // Agregar token si está disponible
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    let { query } = payload
    query = transformToParamsString(query)

    return new Promise((resolve, reject) => {
      axiosInstance
        .patch(`${payload.path}${query}`, payload.body, config)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * DELETE request
   * @param {object} payload - { path, query, headers }
   * @returns {Promise}
   */
  async delete(payload) {
    const config = {
      headers: { ...payload.headers, 'x-request-id': crypto.randomUUID() },
    }

    // Agregar token si está disponible
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    let { query } = payload
    query = transformToParamsString(query)

    return new Promise((resolve, reject) => {
      axiosInstance
        .delete(`${payload.path}${query}`, config)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * GET File request (para descargar archivos)
   * @param {object} payload - { path, query, headers }
   * @returns {Promise}
   */
  async getFile(payload) {
    const config = {
      responseType: 'arraybuffer',
      headers: { ...payload.headers, 'x-request-id': crypto.randomUUID() },
    }

    // Agregar token si está disponible
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    let { query } = payload
    query = transformToParamsString(query)

    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`${payload.path}${query}`, config)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          // Intentar parsear el error como JSON si es posible
          if (error.response && error.response.data) {
            try {
              const data = new TextDecoder().decode(error.response.data)
              error.response.data = JSON.parse(data)
            } catch (e) {
              // Si no se puede parsear, dejar el error original
            }
          }
          reject(error)
        })
    })
  },
}

export default APIFactory
