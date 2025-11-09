import { defineStore } from 'pinia'
import { ref } from 'vue'
import APIFactory from '@/api/APIFactory'

export const useRulesStore = defineStore('rules', () => {
  // State
  const rule = ref(null)
  const rules = ref([])
  const loading = ref(false)
  const whitelistOptions = ref([])

  // Hardcoded Spanish catalogs
  const ruleConditions = ref([
    { label: 'Monto', value: 0 },
    { label: 'Rango de monto', value: 1 },
    { label: 'Días', value: 2 },
    { label: 'Rango de hora', value: 4 },
    { label: 'Monto total', value: 9 },
    { label: 'Cantidad de transacciones', value: 10 },
  ])

  const ruleChannels = ref([
    { label: 'POS', value: 'POS' },
    { label: 'ECOM', value: 'ECOM' },
    { label: 'ATM', value: 'ATM' },
    { label: 'MOTO', value: 'MOTO' },
  ])

  const operatorsAmountAndHour = ref([
    { label: 'Mayor que (>)', value: '>' },
    { label: 'Menor que (<)', value: '<' },
    { label: 'Igual a (=)', value: '=' },
  ])

  const operatorsTotalAmountAndTransactionNum = ref([
    { label: 'Mayor que (>)', value: '>' },
    { label: 'Mayor o igual que (>=)', value: '>=' },
  ])

  const operatorsRange = ref([
    { label: 'Dentro de', value: '=' },
    { label: 'Fuera de', value: '!=' },
  ])

  const operatorsComparations = ref([
    { label: 'Igual a', value: '=' },
    { label: 'Diferente de', value: '!=' },
  ])

  const daysList = ref([
    { label: 'Lunes', value: 1 },
    { label: 'Martes', value: 2 },
    { label: 'Miércoles', value: 3 },
    { label: 'Jueves', value: 4 },
    { label: 'Viernes', value: 5 },
    { label: 'Sábado', value: 6 },
    { label: 'Domingo', value: 7 },
  ])

  // Actions
  const createRule = async (payload) => {
    try {
      loading.value = true
      const response = await APIFactory.post({
        path: 'preauth/rules',
        body: payload,
      })
      return response.data
    } catch (error) {
      console.error('Error creating rule:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const getRuleById = async (id) => {
    try {
      loading.value = true
      // El gateway no tiene endpoint específico para getById, obtener todas y filtrar
      const response = await APIFactory.get({
        path: 'preauth/rules',
      })
      const rules = response.data.data || response.data || []
      const foundRule = rules.find((r) => r._id === id || r.id === id)
      if (!foundRule) {
        throw new Error(`Regla con ID ${id} no encontrada`)
      }
      rule.value = foundRule
      return foundRule
    } catch (error) {
      console.error('Error fetching rule:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const updateRule = async (id, payload) => {
    try {
      loading.value = true
      const updatedPayload = {
        ...payload,
        _id: id,
      }
      const response = await APIFactory.post({
        path: 'preauth/rules',
        body: updatedPayload,
      })
      return response.data
    } catch (error) {
      console.error('Error updating rule:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const getWhitelist = async () => {
    try {
      loading.value = true
      const response = await APIFactory.get({
        path: 'whitelist/list',
      })
      whitelistOptions.value = response.data
      return response.data
    } catch (error) {
      console.error('Error fetching whitelist:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const deleteRule = async (id) => {
    try {
      loading.value = true
      // Intentar delete, si no está disponible lanzar error
      const response = await APIFactory.delete({
        path: `preauth/rules/${id}`,
      })
      return response.data
    } catch (error) {
      console.error('Error deleting rule:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const getRules = async () => {
    try {
      loading.value = true
      const response = await APIFactory.get({
        path: 'preauth/rules',
      })
      // La respuesta viene con estructura { code, message, data: [...] }
      rules.value = response.data.data || []
      return response.data.data || []
    } catch (error) {
      console.error('Error fetching rules:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const toggleRuleState = async (id, ruleData) => {
    try {
      loading.value = true
      const payload = {
        id: id,
        state: !ruleData.state,
      }
      const response = await APIFactory.post({
        path: 'preauth/ruleState',
        body: payload,
      })
      return response.data
    } catch (error) {
      console.error('Error toggling rule state:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    rule,
    rules,
    loading,
    whitelistOptions,
    // Catalogs
    ruleConditions,
    ruleChannels,
    operatorsAmountAndHour,
    operatorsTotalAmountAndTransactionNum,
    operatorsRange,
    operatorsComparations,
    daysList,
    // Actions
    createRule,
    getRuleById,
    updateRule,
    getWhitelist,
    deleteRule,
    getRules,
    toggleRuleState,
  }
})
