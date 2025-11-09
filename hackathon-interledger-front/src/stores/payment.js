import { defineStore } from 'pinia'
import { ref } from 'vue'
import axiosInstance from '@/api/axios'

export const usePaymentStore = defineStore('payment', () => {
  // State
  const loading = ref(false)
  const paymentResponse = ref(null)
  const error = ref(null)

  // Actions
  const processPayment = async (paymentData) => {
    try {
      loading.value = true
      error.value = null

      const response = await axiosInstance.post('/payments/payment-request?', paymentData)

      paymentResponse.value = response.data
      return response.data
    } catch (err) {
      console.error('Error al procesar el pago:', err)

      // Manejar diferentes tipos de errores
      if (err.response) {
        // El servidor respondió con un código de estado de error
        error.value =
          err.response.data?.message || `Error ${err.response.status}: ${err.response.statusText}`
      } else if (err.request) {
        // La petición se hizo pero no se recibió respuesta
        error.value = 'Error de conexión: No se pudo conectar con el servidor'
      } else {
        // Algo más causó el error
        error.value = `Error: ${err.message}`
      }

      paymentResponse.value = null
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearPayment = () => {
    paymentResponse.value = null
    error.value = null
  }

  return {
    // State
    loading,
    paymentResponse,
    error,
    // Actions
    processPayment,
    clearPayment,
  }
})
