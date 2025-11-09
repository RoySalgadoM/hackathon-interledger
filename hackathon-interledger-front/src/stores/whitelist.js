import { defineStore } from 'pinia'
import { ref } from 'vue'
import APIFactory from '@/api/APIFactory'

export const useWhitelistStore = defineStore('whitelist', () => {
  // State
  const whitelist = ref(null)
  const whitelists = ref([])
  const loading = ref(false)

  // Actions
  const createWhitelist = async (payload) => {
    try {
      loading.value = true
      const response = await APIFactory.post({
        path: 'whitelist',
        body: payload,
      })
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
      const response = await APIFactory.get({
        path: `whitelist/${id}`,
      })
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
      const updatedPayload = {
        ...payload,
        _id: id,
      }
      const response = await APIFactory.post({
        path: 'whitelist',
        body: updatedPayload,
      })
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
      const response = await APIFactory.get({
        path: 'whitelist',
      })
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
      const response = await APIFactory.delete({
        path: `whitelist/${id}`,
      })
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
