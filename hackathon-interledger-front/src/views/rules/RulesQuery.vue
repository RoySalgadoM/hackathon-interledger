<template>
  <e-content-layout>
    <template #title>
      <h1>Consulta de Reglas</h1>
    </template>
    <template #description>
      <p>Administre las reglas del sistema</p>
    </template>
    <template #tr-content>
      <div class="w-full flex justify-end">
        <e-btn variant="primary" @click="handleAddRule">
          <span>
            <i class="fa-solid fa-plus"></i>
          </span>
          <span> Nueva Regla </span>
        </e-btn>
      </div>
    </template>
    <template #default>
      <div class="rules-query-container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-message">Cargando reglas...</div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <!-- Rules Table -->
        <div v-if="!loading" class="table-wrapper">
          <table class="rules-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rule in rulesStore.rules" :key="rule._id">
                <td>{{ rule._id }}</td>
                <td>{{ rule.name }}</td>
                <td>{{ rule.description }}</td>
                <td>
                  <label class="switch">
                    <input
                      type="checkbox"
                      :checked="rule.state"
                      @change="handleToggleState(rule)"
                      :disabled="togglingState"
                    />
                    <span class="slider"></span>
                  </label>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-edit" @click="handleEditRule(rule._id)" title="Editar">
                      <e-icon name="edit" size="medium" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="rulesStore.rules.length === 0 && !loading">
                <td colspan="5" class="empty-message">No hay reglas registradas</td>
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
import { useRulesStore } from '@/stores/rules'

const router = useRouter()
const rulesStore = useRulesStore()

const loading = ref(false)
const togglingState = ref(false)
const errorMessage = ref('')

onBeforeMount(async () => {
  try {
    loading.value = true
    await rulesStore.getRules()
  } catch (error) {
    console.error('Error loading rules:', error)
    errorMessage.value = 'Error al cargar las reglas'
  } finally {
    loading.value = false
  }
})

const handleAddRule = () => {
  router.push({ name: 'rulesAdd' })
}

const handleEditRule = (id) => {
  router.push({ name: 'rulesEdit', params: { id } })
}

const handleToggleState = async (rule) => {
  try {
    togglingState.value = true
    errorMessage.value = ''
    await rulesStore.toggleRuleState(rule._id, rule)
    // Reload rules to reflect the change
    await rulesStore.getRules()
  } catch (error) {
    console.error('Error toggling rule state:', error)
    errorMessage.value = 'Error al cambiar el estado de la regla'
  } finally {
    togglingState.value = false
  }
}
</script>

<style scoped>
.rules-query-container {
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

.rules-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.rules-table thead {
  background-color: #1f2937;
  color: white;
}

.rules-table th {
  padding: 12px 16px;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 14px;
}

.rules-table td {
  padding: 12px 16px;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
}

.rules-table tbody tr:hover {
  background-color: #f9fafb;
}

.empty-message {
  text-align: center;
  color: #6b7280;
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

/* Switch Styles */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-1) 100%);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--color-primary);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

input:disabled + .slider {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
