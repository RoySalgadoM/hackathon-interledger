import { defineStore } from 'pinia'
import { ref } from 'vue'
import APIFactory from '@/api/APIFactory'

export const usePaymentStore = defineStore('payment', () => {
  // State
  const loading = ref(false)
  const paymentResponse = ref(null)
  const error = ref(null)
  const paymentStatus = ref(null)

  // Actions
  const processPayment = async (paymentData) => {
    try {
      loading.value = true
      error.value = null

      const { merchant_account, client_account, amount, id } = paymentData

      const response = await APIFactory.post({
        path: `payments/payment-request?merchant_account=${merchant_account}&client_account=${client_account}&amount=${amount}`,
        headers: {
          'x-request-id': id,
        },
      })

      console.log('response', response.data.data.redirect_url)

      window.location.href = response.data.data.redirect_url
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const clearPayment = () => {
    paymentResponse.value = null
    error.value = null
    paymentStatus.value = null
  }

  const verifyPaymentStatus = async (requestId) => {
    try {
      const response = await APIFactory.get({
        path: `payments/payment-verification?request_id=${requestId}`,
      })

      if (response?.data?.data?.payment_status) {
        paymentStatus.value = response.data.data.payment_status
        return response.data.data.payment_status
      }

      return null
    } catch (err) {
      console.error('Error al verificar el estado del pago:', err)
      error.value = err.message || 'Error al verificar el pago'
      return null
    }
  }

  return {
    // State
    loading,
    paymentResponse,
    error,
    paymentStatus,
    // Actions
    processPayment,
    clearPayment,
    verifyPaymentStatus,
  }
})
