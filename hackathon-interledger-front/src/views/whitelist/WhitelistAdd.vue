<template>
  <e-content-layout>
    <template #title>
      <h1>{{ isUpdateView ? 'Editar Lista Blanca' : 'Alta de Lista Blanca' }}</h1>
    </template>
    <template #description>
      <p>
        {{
          isUpdateView
            ? 'Modifique los datos de la lista blanca'
            : 'Ingrese los datos de la nueva lista blanca'
        }}
      </p>
    </template>
    <template #default>
      <form @submit.prevent="handleSubmit" class="w-full">
        <div class="grid gap-6">
          <!-- Name Field -->
          <div>
            <e-input
              v-model="whitelistForm.name"
              label="Nombre"
              placeholder="Ingrese el nombre de la lista blanca"
              :maxlength="100"
              required
            />
          </div>

          <!-- Description Field -->
          <div>
            <e-input
              v-model="whitelistForm.description"
              label="Descripción"
              placeholder="Ingrese una descripción de la lista blanca"
              :maxlength="250"
              type="text"
              required
            />
          </div>

          <!-- Wallets Field -->
          <div>
            <e-select
              v-model="whitelistForm.wallets"
              label="Wallets"
              :options="walletStore.wallets"
              placeholder="Seleccione los wallets"
              multiple
              required
            />
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
import { useWhitelistStore } from '@/stores/whitelist'
import { useWalletStore } from '@/stores/wallet'

const router = useRouter()
const route = useRoute()
const whitelistStore = useWhitelistStore()
const walletStore = useWalletStore()

const isUpdateView = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const whitelistForm = ref({
  name: '',
  description: '',
  wallets: [],
})

onBeforeMount(async () => {
  // Detect if in edit mode
  isUpdateView.value = route.name == 'whitelistEdit'

  // If edit mode, load whitelist data
  if (isUpdateView.value && route.params.id) {
    try {
      loading.value = true
      const whitelistData = await whitelistStore.getWhitelistById(route.params.id)

      whitelistForm.value.name = whitelistData.name || ''
      whitelistForm.value.description = whitelistData.description || ''
      whitelistForm.value.wallets = whitelistData.wallets || []
    } catch (error) {
      console.error('Error loading whitelist:', error)
      errorMessage.value = 'Error al cargar los datos de la lista blanca'
    } finally {
      loading.value = false
    }
  }
})

const handleSubmit = async () => {
  errorMessage.value = ''

  // Validate form
  if (!whitelistForm.value.name.trim()) {
    errorMessage.value = 'El nombre es requerido'
    return
  }

  if (!whitelistForm.value.description.trim()) {
    errorMessage.value = 'La descripción es requerida'
    return
  }

  if (!whitelistForm.value.wallets || whitelistForm.value.wallets.length === 0) {
    errorMessage.value = 'Debe seleccionar al menos un wallet'
    return
  }

  // Prepare payload
  const payload = {
    name: whitelistForm.value.name.trim(),
    description: whitelistForm.value.description.trim(),
    wallets: whitelistForm.value.wallets,
  }

  try {
    loading.value = true

    if (isUpdateView.value) {
      // Update existing whitelist
      await whitelistStore.updateWhitelist(route.params.id, payload)
      alert('Lista blanca actualizada exitosamente')
    } else {
      // Create new whitelist
      await whitelistStore.createWhitelist(payload)
      alert('Lista blanca creada exitosamente')
    }

    // Redirect to whitelists list
    router.push({ name: 'whitelistQuery' })
  } catch (error) {
    console.error('Error saving whitelist:', error)
    errorMessage.value = error.response?.data?.message || 'Error al guardar la lista blanca'
  } finally {
    loading.value = false
  }
}

const handleBack = () => {
  router.back()
}

const handleDelete = async () => {
  if (!confirm('¿Está seguro de que desea eliminar esta lista blanca?')) {
    return
  }

  try {
    loading.value = true
    await whitelistStore.deleteWhitelist(route.params.id)
    alert('Lista blanca eliminada exitosamente')
    router.push({ name: 'whitelistQuery' })
  } catch (error) {
    console.error('Error deleting whitelist:', error)
    errorMessage.value = 'Error al eliminar la lista blanca'
  } finally {
    loading.value = false
  }
}
</script>
