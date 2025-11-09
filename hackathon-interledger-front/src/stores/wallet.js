import { defineStore } from 'pinia'
import { ref } from 'vue'
import axiosInstance from '@/api/axios'

export const useWalletStore = defineStore('wallet', () => {
  // State
  const wallets = ref([])
  const loading = ref(false)

  // Actions
  const getWallets = async () => {
    try {
      loading.value = true
      const response = await axiosInstance.get('/api/wallets')
      // La respuesta viene con estructura { code, message, data: [...] }
      const walletsData = response.data.data || []

      // Transformar la estructura para que coincida con el formato de los select
      // wallet_address -> value, wallet_name -> label
      wallets.value = walletsData.map((wallet) => ({
        value: wallet.wallet_address || '',
        label: wallet.wallet_name || '',
      }))

      return wallets.value
    } catch (error) {
      console.error('Error fetching wallets:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    wallets,
    loading,
    // Actions
    getWallets,
  }
})
