import { defineStore } from 'pinia'
import { ref } from 'vue'
import axiosInstance from '@/api/axios'

export const useWhitelistStore = defineStore('whitelist', () => {
  // State
  const whitelist = ref(null)
  const whitelists = ref([])
  const loading = ref(false)

  // Actions
  const createWhitelist = async (payload) => {
    try {
      loading.value = true
      const response = await axiosInstance.post('/api/whitelist', payload)
      return response.data
    } catch (error) {
      console.error('Error creating whitelist:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const getWhitelistById = async (id) => {
    try {
      loading.value = true
      const response = await axiosInstance.get(`/api/whitelist/${id}`)
      whitelist.value = response.data
      return response.data
    } catch (error) {
      console.error('Error fetching whitelist:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const updateWhitelist = async (id, payload) => {
    try {
      loading.value = true
      // Asegurar que el payload incluya el _id
      const updatedPayload = {
        ...payload,
        _id: id,
      }
      const response = await axiosInstance.post('/api/whitelist', updatedPayload)
      return response.data
    } catch (error) {
      console.error('Error updating whitelist:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const getWhitelists = async () => {
    try {
      loading.value = true
      const response = await axiosInstance.get('/api/whitelist')
      // La respuesta viene con estructura { code, message, data: [...] }
      whitelists.value = response.data.data || []
      return response.data.data || []
    } catch (error) {
      console.error('Error fetching whitelists:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const deleteWhitelist = async (id) => {
    try {
      loading.value = true
      const response = await axiosInstance.delete(`/api/whitelist/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting whitelist:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    whitelist,
    whitelists,
    loading,
    // Actions
    createWhitelist,
    getWhitelistById,
    updateWhitelist,
    getWhitelists,
    deleteWhitelist,
  }
})
