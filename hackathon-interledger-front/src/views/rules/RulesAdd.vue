<template>
  <e-content-layout>
    <template #title>
      <h1>{{ isUpdateView ? 'Editar Regla' : 'Alta de Regla' }}</h1>
    </template>
    <template #description>
      <p>
        {{
          isUpdateView ? 'Modifique los datos de la regla' : 'Ingrese los datos de la nueva regla'
        }}
      </p>
    </template>
    <template #default>
      <form @submit.prevent="handleSubmit" class="w-full">
        <div class="grid gap-6">
          <!-- Name Field -->
          <div>
            <e-input
              v-model="ruleForm.name"
              label="Nombre"
              placeholder="Ingrese el nombre de la regla"
              :maxlength="30"
              required
            />
          </div>

          <!-- Description Field -->
          <div>
            <e-input
              v-model="ruleForm.description"
              label="Descripción"
              placeholder="Ingrese una descripción de la regla"
              :maxlength="250"
              type="text"
              required
            />
          </div>

          <!-- Wallets Field -->
          <div>
            <e-select
              v-model="ruleForm.wallets"
              label="Carteras"
              :options="walletStore.wallets"
              placeholder="Seleccione las carteras"
              multiple
              required
            />
          </div>

          <!-- Params Component -->
          <div>
            <e-params ref="paramsForm" v-model="paramsList" />
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="text-red-600 p-3 bg-red-50 rounded">
            {{ errorMessage }}
          </div>

          <!-- Buttons -->
          <div class="flex gap-4" :class="isUpdateView ? 'justify-between' : 'justify-end'">
            <e-btn v-if="isUpdateView" variant="outline" @click="handleBack"> ← Volver </e-btn>

            <div class="flex gap-3">
              <e-btn v-if="isUpdateView" variant="danger" @click="handleDelete"> Eliminar </e-btn>
              <e-btn type="submit" variant="primary" :disabled="loading">
                {{ loading ? 'Guardando...' : isUpdateView ? 'Actualizar' : 'Guardar' }}
              </e-btn>
            </div>
          </div>
        </div>
      </form>
    </template>
  </e-content-layout>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRulesStore } from '@/stores/rules'
import { useWalletStore } from '@/stores/wallet'

const router = useRouter()
const route = useRoute()
const rulesStore = useRulesStore()
const walletStore = useWalletStore()

const paramsForm = ref(null)
const isUpdateView = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const ruleForm = ref({
  name: '',
  description: '',
  wallets: [],
})

const paramsList = ref([])

onBeforeMount(async () => {
  // Detect if in edit mode
  isUpdateView.value = route.name == 'rulesEdit'

  // Load whitelist options
  try {
    await rulesStore.getWhitelist()
  } catch (error) {
    console.error('Error loading whitelist:', error)
  }

  // If edit mode, load rule data
  if (isUpdateView.value && route.params.id) {
    try {
      loading.value = true
      const ruleData = await rulesStore.getRuleById(route.params.id)

      ruleForm.value.name = ruleData.name || ''
      ruleForm.value.description = ruleData.description || ''
      ruleForm.value.wallets = ruleData.wallets || []

      // Load conditions if they exist
      if (ruleData.structure && Array.isArray(ruleData.structure)) {
        paramsList.value = ruleData.structure.map((item) => ({
          field: item.elementData?.field ?? item.field,
          action: item.elementData?.action ?? item.action,
          value: item.elementData?.value ?? item.value,
          channels: item.elementData?.channels ?? item.channels,
          logicOperator: item.logicOperator || 'AND',
          level: item.level || 1,
          type: item.type || 'simple',
        }))
      }
    } catch (error) {
      console.error('Error loading rule:', error)
      errorMessage.value = 'Error al cargar los datos de la regla'
    } finally {
      loading.value = false
    }
  }
})

const handleSubmit = async () => {
  errorMessage.value = ''

  // Validate form
  if (!ruleForm.value.name.trim()) {
    errorMessage.value = 'El nombre es requerido'
    return
  }

  if (!ruleForm.value.description.trim()) {
    errorMessage.value = 'La descripción es requerida'
    return
  }

  if (!ruleForm.value.wallets || ruleForm.value.wallets.length === 0) {
    errorMessage.value = 'Debe seleccionar al menos una cartera'
    return
  }

  // Validate params
  if (paramsForm.value && paramsForm.value.validated()) {
    errorMessage.value = 'Por favor complete o cancele la condición actual'
    return
  }

  if (paramsList.value.length == 0) {
    errorMessage.value = 'Debe agregar al menos una condición'
    return
  }

  // Prepare payload
  const payload = {
    name: ruleForm.value.name.trim(),
    description: ruleForm.value.description.trim(),
    wallets: ruleForm.value.wallets,
    structure: paramsList.value.map((param) => ({
      level: param.level || 1,
      logicOperator: param.logicOperator || 'AND',
      type: param.type || 'simple',
      elementData: {
        action: param.action,
        channels: Array.isArray(param.channels) ? param.channels : [param.channels],
        value: param.value,
        field: param.field,
      },
    })),
  }

  try {
    loading.value = true

    if (isUpdateView.value) {
      // Update existing rule
      await rulesStore.updateRule(route.params.id, payload)
      alert('Regla actualizada exitosamente')
    } else {
      // Create new rule
      await rulesStore.createRule(payload)
      alert('Regla creada exitosamente')
    }

    // Redirect to rules list or dashboard
    router.push({ name: 'dashboard' })
  } catch (error) {
    console.error('Error saving rule:', error)
    errorMessage.value = error.response?.data?.message || 'Error al guardar la regla'
  } finally {
    loading.value = false
  }
}

const handleBack = () => {
  router.back()
}

const handleDelete = async () => {
  if (!confirm('¿Está seguro de que desea eliminar esta regla?')) {
    return
  }

  try {
    loading.value = true
    await rulesStore.deleteRule(route.params.id)
    alert('Regla eliminada exitosamente')
    router.push({ name: 'dashboard' })
  } catch (error) {
    console.error('Error deleting rule:', error)
    errorMessage.value = 'Error al eliminar la regla'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.grid {
  display: grid;
}

.gap-6 {
  gap: 1.5rem;
}

.gap-4 {
  gap: 1rem;
}

.gap-3 {
  gap: 0.75rem;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.justify-end {
  justify-content: flex-end;
}

.w-full {
  width: 100%;
}

.text-red-600 {
  color: #dc2626;
}

.p-3 {
  padding: 0.75rem;
}

.bg-red-50 {
  background-color: #fef2f2;
}

.rounded {
  border-radius: 0.375rem;
}
</style>
