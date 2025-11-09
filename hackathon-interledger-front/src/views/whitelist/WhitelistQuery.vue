<template>
  <e-content-layout>
    <template #title>
      <h1>Lista Blanca de Wallets</h1>
    </template>
    <template #description>
      <p>Administre las listas blancas de wallets del sistema</p>
    </template>
    <template #tr-content>
      <div class="w-full flex justify-end">
        <e-btn variant="primary" @click="handleAddWhitelist">
          <span>
            <i class="fa-solid fa-plus"></i>
          </span>
          <span> Nueva Lista Blanca </span>
        </e-btn>
      </div>
    </template>
    <template #default>
      <div class="whitelist-query-container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-message">Cargando listas blancas...</div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <!-- Whitelists Table -->
        <div v-if="!loading" class="table-wrapper">
          <table class="whitelist-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Wallets</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="whitelist in whitelistStore.whitelists" :key="whitelist._id">
                <td>{{ whitelist._id }}</td>
                <td>{{ whitelist.name }}</td>
                <td>{{ whitelist.description }}</td>
                <td>
                  <div class="wallets-display">
                    <span v-if="whitelist.wallets && whitelist.wallets.length > 0">
                      {{ whitelist.wallets.length }} wallet(s)
                    </span>
                    <span v-else class="no-wallets">Sin wallets</span>
                  </div>
                </td>
                <td>
                  <div class="action-buttons">
                    <button
                      class="btn-edit"
                      @click="handleEditWhitelist(whitelist._id)"
                      title="Editar"
                    >
                      <e-icon name="edit" size="medium" />
                    </button>
                    <button
                      class="btn-delete"
                      @click="handleDeleteWhitelist(whitelist._id)"
                      title="Eliminar"
                    >
                      <e-icon name="delete" size="medium" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="whitelistStore.whitelists.length === 0 && !loading">
                <td colspan="5" class="empty-message">No hay listas blancas registradas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </e-content-layout>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useWhitelistStore } from '@/stores/whitelist'

const router = useRouter()
const whitelistStore = useWhitelistStore()

const loading = ref(false)
const errorMessage = ref('')

onBeforeMount(async () => {
  try {
    loading.value = true
    await whitelistStore.getWhitelists()
  } catch (error) {
    console.error('Error loading whitelists:', error)
    errorMessage.value = 'Error al cargar las listas blancas'
  } finally {
    loading.value = false
  }
})

const handleAddWhitelist = () => {
  router.push({ name: 'whitelistAdd' })
}

const handleEditWhitelist = (id) => {
  router.push({ name: 'whitelistEdit', params: { id } })
}

const handleDeleteWhitelist = async (id) => {
  if (!confirm('¿Está seguro de que desea eliminar esta lista blanca?')) {
    return
  }

  try {
    loading.value = true
    errorMessage.value = ''
    await whitelistStore.deleteWhitelist(id)
    // Reload whitelists to reflect the change
    await whitelistStore.getWhitelists()
    alert('Lista blanca eliminada exitosamente')
  } catch (error) {
    console.error('Error deleting whitelist:', error)
    errorMessage.value = 'Error al eliminar la lista blanca'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.whitelist-query-container {
  width: 100%;
  padding: 20px 0;
}

.loading-message {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #6b7280;
}

.error-message {
  padding: 12px 16px;
  margin-bottom: 20px;
  background-color: #fef2f2;
  color: #dc2626;
  border-radius: 8px;
  border: 1px solid #fecaca;
}

.table-wrapper {
  overflow-x: auto;
  margin-top: 20px;
}

.whitelist-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.whitelist-table thead {
  background-color: #1f2937;
  color: white;
}

.whitelist-table th {
  padding: 12px 16px;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 14px;
}

.whitelist-table td {
  padding: 12px 16px;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
}

.whitelist-table tbody tr:hover {
  background-color: #f9fafb;
}

.empty-message {
  text-align: center;
  color: #6b7280;
  font-style: italic;
}

.wallets-display {
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-wallets {
  color: #9ca3af;
  font-style: italic;
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.btn-edit {
  background: none;
  border: none;
  cursor: pointer;
  color: #3b82f6;
  font-size: 18px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}

.btn-edit:hover {
  background-color: #dbeafe;
  transform: scale(1.1);
}

.btn-delete {
  background: none;
  border: none;
  cursor: pointer;
  color: #ef4444;
  font-size: 18px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}

.btn-delete:hover {
  background-color: #fee2e2;
  transform: scale(1.1);
}
</style>
