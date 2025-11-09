import { defineStore } from 'pinia'
import { ref } from 'vue'
import APIFactory from '@/api/APIFactory'

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
