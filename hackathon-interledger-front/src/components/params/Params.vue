<template>
  <div class="params-container">
    <!-- Conditions Section -->
    <div class="params-header">
      <div class="params-title">Condiciones</div>
      <e-btn v-if="!onlyRead" variant="primary" size="small" @click="handleNewParam">
        + Nueva Condición
      </e-btn>
    </div>

    <div class="params-table-wrapper">
      <table class="params-table">
        <thead>
          <tr>
            <th>Parámetro</th>
            <th>Operador</th>
            <th>Valor</th>
            <th v-if="!onlyRead">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(param, index) in conditionsList"
            :key="'condition-' + index"
            :class="{ 'editing-row': param.isEdit || param.isNew }"
          >
            <!-- Edit/New Mode -->
            <template v-if="param.isEdit || param.isNew">
              <td>
                <e-select
                  :modelValue="param.field"
                  :options="rulesStore.ruleConditions"
                  @update:modelValue="handleSetValue(param.index, 'field', $event)"
                  placeholder="Seleccionar parámetro"
                  required
                />
              </td>
              <td>
                <e-select
                  :modelValue="param.action"
                  :options="getOperatorOptions(param.field)"
                  @update:modelValue="handleSetValue(param.index, 'action', $event)"
                  placeholder="Seleccionar operador"
                  required
                  :disabled="param.field == null || param.field == undefined"
                />
              </td>
              <td>
                <div class="value-inputs-container">
                  <!-- Days field with multiple selection -->
                  <template v-if="param.field === 2">
                    <div class="days-selection">
                      <label
                        v-for="day in rulesStore.daysList"
                        :key="day.value"
                        class="day-checkbox"
                      >
                        <input
                          type="checkbox"
                          :value="day.value"
                          :checked="
                            Array.isArray(param.value)
                              ? param.value.includes(day.value)
                              : param.value == day.value
                          "
                          @change="handleDayToggle(param.index, day.value)"
                        />
                        <span>{{ day.label }}</span>
                      </label>
                    </div>
                  </template>

                  <!-- Range fields (Monto, Hora) -->
                  <template v-else-if="param.field === 1 || param.field === 3">
                    <e-input
                      :modelValue="param.value"
                      @update:modelValue="handleSetValue(param.index, 'value', $event)"
                      :placeholder="param.field === 1 ? 'Valor inicial' : 'Hora inicial (HH:MM)'"
                      :type="param.field === 1 ? 'number' : 'text'"
                      :maxlength="param.field === 3 ? 5 : undefined"
                      required
                    />
                    <e-input
                      :modelValue="param.secondValue"
                      @update:modelValue="handleSetValue(param.index, 'secondValue', $event)"
                      :placeholder="param.field === 1 ? 'Valor final' : 'Hora final (HH:MM)'"
                      :type="param.field === 1 ? 'number' : 'text'"
                      :maxlength="param.field === 3 ? 5 : undefined"
                      required
                    />
                  </template>

                  <!-- Number fields: Monto (0), Monto total (4), Cantidad (5) -->
                  <template v-else-if="param.field === 0 || param.field === 4 || param.field === 5">
                    <e-input
                      :modelValue="param.value"
                      @update:modelValue="handleSetValue(param.index, 'value', $event)"
                      placeholder="Valor"
                      type="number"
                      required
                    />
                  </template>

                  <!-- Placeholder when no field selected -->
                  <template v-else>
                    <e-input modelValue="" placeholder="Seleccione primero un parámetro" disabled />
                  </template>
                </div>
              </td>
            </template>

            <!-- Display Mode -->
            <template v-else>
              <td>{{ getLabelCondition(param.field) }}</td>
              <td>{{ getLabelOperator(param.field, param.action) }}</td>
              <td>
                <div class="flex gap-2 items-center justify-center flex-wrap">
                  <!-- Days as chips -->
                  <template v-if="param.field === 2 && Array.isArray(param.value)">
                    <span v-for="(dayValue, idx) in param.value" :key="idx" class="value-chip">
                      {{ formatDayValue(dayValue) }}
                    </span>
                  </template>
                  <!-- Range values -->
                  <template v-else-if="Array.isArray(param.value) && param.value.length == 2">
                    <span>{{ param.value[0] }} - {{ param.value[1] }}</span>
                  </template>
                  <!-- Simple value -->
                  <template v-else>
                    {{ formatValue(param.field, param.value) }}
                  </template>
                </div>
              </td>
            </template>

            <td v-if="!onlyRead">
              <div class="params-actions">
                <template v-if="param.isEdit || param.isNew">
                  <span class="params-action-icon confirm" @click="handleConfirm(param.index)">
                    ✓
                  </span>
                  <span class="params-action-icon cancel" @click="handleCancelParam(param.index)">
                    ✕
                  </span>
                </template>
                <template v-else>
                  <span class="params-action-icon edit" @click="handleEdit(param.index)"> ✎ </span>
                  <span class="params-action-icon delete" @click="handleRemove(param.index)">
                    🗑
                  </span>
                </template>
              </div>
            </td>
          </tr>
          <tr v-if="conditionsList.length == 0">
            <td :colspan="onlyRead ? 3 : 4" style="text-align: center; color: #6b7280">
              No hay condiciones agregadas
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Divider -->
    <div class="params-section-divider"></div>

    <!-- Whitelist Section -->
    <div class="params-section-header">
      <e-btn v-if="!onlyRead" variant="secondary" size="small" @click="handleNewException">
        + Nueva Excepción (Whitelist)
      </e-btn>
    </div>

    <div class="params-table-wrapper">
      <table class="params-table">
        <thead>
          <tr>
            <th>Whitelist</th>
            <th>Selección</th>
            <th>Valor</th>
            <th v-if="!onlyRead">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(param, index) in whiteList"
            :key="'whitelist-' + index"
            :class="{ 'editing-row': param.isEdit || param.isNew }"
          >
            <!-- Edit/New Mode -->
            <template v-if="param.isEdit || param.isNew">
              <td>Excepción</td>
              <td>
                <e-select
                  :modelValue="param.action"
                  :options="rulesStore.operatorsComparations"
                  @update:modelValue="handleSetValue(param.index, 'action', $event)"
                  placeholder="Seleccionar"
                  required
                />
              </td>
              <td>
                <e-select
                  :modelValue="param.value"
                  :options="rulesStore.whitelistOptions"
                  @update:modelValue="handleSetValue(param.index, 'value', $event)"
                  placeholder="Seleccionar whitelist"
                  required
                />
              </td>
            </template>

            <!-- Display Mode -->
            <template v-else>
              <td>Excepción</td>
              <td>{{ getLabelOperator(param.field, param.action) }}</td>
              <td>
                <span class="value-chip">{{ getLabelWhitelist(param.value) }}</span>
              </td>
            </template>

            <td v-if="!onlyRead">
              <div class="params-actions">
                <template v-if="param.isEdit || param.isNew">
                  <span class="params-action-icon confirm" @click="handleConfirm(param.index)">
                    ✓
                  </span>
                  <span class="params-action-icon cancel" @click="handleCancelParam(param.index)">
                    ✕
                  </span>
                </template>
                <template v-else>
                  <span class="params-action-icon edit" @click="handleEdit(param.index)"> ✎ </span>
                  <span class="params-action-icon delete" @click="handleRemove(param.index)">
                    🗑
                  </span>
                </template>
              </div>
            </td>
          </tr>
          <tr v-if="whiteList.length == 0">
            <td :colspan="onlyRead ? 3 : 4" style="text-align: center; color: #6b7280">
              No hay excepciones agregadas
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount, defineProps, defineEmits, defineExpose } from 'vue'
import { useRulesStore } from '@/stores/rules'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  onlyRead: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const rulesStore = useRulesStore()
const paramsList = ref([])
const isFormActive = ref(false)
const originalValueParam = ref(null)
const indexEdit = ref(null)

// Computed lists
const conditionsList = computed(() => {
  const list = paramsList.value
    .map((element, index) => ({ ...element, index }))
    .filter((element) => element.field !== 6)

  console.log('conditionsList computed, length:', list.length, 'list:', list)
  return list
})

const whiteList = computed(() => {
  return paramsList.value
    .map((element, index) => ({ ...element, index }))
    .filter((element) => element.field === 6)
})

// Get operator options based on field type - Make it reactive per param
const getOperatorOptions = computed(() => {
  return (field) => {
    if (field == null || field == undefined) return []
    console.log('field in catlog operators', field)
    switch (field) {
      case 0: // amount - Monto
        return rulesStore.operatorsAmountAndHour
      case 4: // accumulates - Monto total
      case 5: // tx_accumulates - Cantidad de transacciones
        return rulesStore.operatorsTotalAmountAndTransactionNum
      case 1: // range_amount - Rango de monto
      case 3: // range_hour - Rango de hora
        return rulesStore.operatorsRange
      case 2: // days - Días
      default:
        return rulesStore.operatorsComparations
    }
  }
})

// Get label for condition
const getLabelCondition = (value) => {
  const condition = rulesStore.ruleConditions.find((element) => element.value == value)
  return condition ? condition.label : value
}

// Get label for operator
const getLabelOperator = (parameter, value) => {
  const operators = getOperatorOptions.value(parameter)
  const operator = operators.find((element) => element.value == value)
  return operator ? operator.label : value
}

// Get label for whitelist
const getLabelWhitelist = (value) => {
  const whitelist = rulesStore.whitelistOptions.find((element) => element.value == value)
  return whitelist ? whitelist.label : value
}

// Format single day value
const formatDayValue = (value) => {
  const day = rulesStore.daysList.find((d) => d.value == value)
  return day ? day.label : value
}

// Format value for display
const formatValue = (field, value) => {
  if (field === 2) {
    // Days field - handle array of days
    if (Array.isArray(value)) {
      return value
        .map((v) => {
          const day = rulesStore.daysList.find((d) => d.value == v)
          return day ? day.label : v
        })
        .join(', ')
    }
    const day = rulesStore.daysList.find((d) => d.value == value)
    return day ? day.label : value
  }
  return value
}

// Handle day toggle for multiple selection
const handleDayToggle = (index, dayValue) => {
  let currentValue = paramsList.value[index].value

  if (!Array.isArray(currentValue)) {
    currentValue = []
  }

  const valueIndex = currentValue.indexOf(dayValue)
  if (valueIndex > -1) {
    // Remove day
    currentValue.splice(valueIndex, 1)
  } else {
    // Add day
    currentValue.push(dayValue)
  }

  paramsList.value[index].value = [...currentValue]
}

// Handle new parameter
const handleNewParam = () => {
  console.log('=== handleNewParam CALLED ===')
  console.log('isFormActive.value:', isFormActive.value)

  if (isFormActive.value) {
    console.log('Form is active, cannot add new condition')
    alert('Por favor complete o cancele la edición actual antes de agregar una nueva condición')
    return
  }

  console.log('Adding new condition, isFormActive:', isFormActive.value)
  console.log('paramsList BEFORE:', JSON.parse(JSON.stringify(paramsList.value)))

  const newParam = {
    field: null,
    action: null,
    value: null,
    secondValue: null,
    channels: ['POS'], // Always set to POS
    isNew: true,
    logicOperator: 'AND',
    level: 1,
    type: 'simple',
  }

  console.log('New param to add:', newParam)

  paramsList.value.unshift(newParam)

  console.log('paramsList AFTER:', JSON.parse(JSON.stringify(paramsList.value)))
  console.log('paramsList.value.length:', paramsList.value.length)

  indexEdit.value = 0
  isFormActive.value = true

  console.log('New condition added, isFormActive:', isFormActive.value)
  console.log('indexEdit:', indexEdit.value)
  console.log('=== handleNewParam COMPLETED ===')
}

// Handle new exception
const handleNewException = () => {
  if (isFormActive.value) {
    alert('Por favor complete o cancele la edición actual antes de agregar una nueva excepción')
    return
  }

  paramsList.value.unshift({
    field: 6,
    action: null,
    value: null,
    channels: ['POS'], // Always set to POS
    isNew: true,
    logicOperator: 'AND',
    level: 1,
    type: 'simple',
  })

  indexEdit.value = 0
  isFormActive.value = true
}

// Handle edit
const handleEdit = (index) => {
  if (isFormActive.value) {
    alert('Por favor complete o cancele la edición actual antes de editar otra condición')
    return
  }

  originalValueParam.value = JSON.parse(JSON.stringify(paramsList.value[index]))

  // If editing a range type, split the value into value and secondValue
  const param = paramsList.value[index]
  if (
    (param.field === 1 || param.field === 3) &&
    Array.isArray(param.value) &&
    param.value.length == 2
  ) {
    param.secondValue = param.value[1]
    param.value = param.value[0]
  }

  paramsList.value[index].isEdit = true
  indexEdit.value = index
  isFormActive.value = true
}

// Handle cancel
const handleCancelParam = (index) => {
  console.log('Canceling param at index:', index, 'isFormActive before:', isFormActive.value)

  if (paramsList.value[index].isNew) {
    paramsList.value.splice(index, 1)
  } else {
    paramsList.value[index] = { ...originalValueParam.value }
  }

  isFormActive.value = false
  originalValueParam.value = null
  indexEdit.value = null

  console.log('Param canceled, isFormActive after:', isFormActive.value)

  emit('update:modelValue', paramsList.value)
}

// Handle confirm
const handleConfirm = (index) => {
  const param = paramsList.value[index]

  console.log('Confirming param at index:', index, 'param:', param)

  // Validate required fields
  if (param.field == null || param.field == undefined) {
    alert('Por favor seleccione un parámetro')
    return
  }
  if (!param.action) {
    alert('Por favor seleccione un operador')
    return
  }

  // Validate value based on field type
  if (param.field === 2) {
    // Days must have at least one selected
    if (!param.value || (Array.isArray(param.value) && param.value.length == 0)) {
      alert('Por favor seleccione al menos un día')
      return
    }
  } else if (param.value == null || param.value == undefined || param.value == '') {
    alert('Por favor ingrese un valor')
    return
  }

  // For range types, validate secondValue
  if ((param.field === 1 || param.field === 3) && !param.secondValue && param.secondValue !== 0) {
    alert('Por favor ingrese el valor final del rango')
    return
  }

  // Ensure channels is always set to POS
  param.channels = ['POS']

  // Ensure field is an integer
  if (param.field !== null && param.field !== undefined) {
    param.field = parseInt(param.field, 10)
  }

  // Combine value and secondValue for range types before saving
  if (param.field === 1 || param.field === 3) {
    param.value = [param.value, param.secondValue]
    delete param.secondValue
  }

  // Clean up edit flags
  delete paramsList.value[index].isEdit
  delete paramsList.value[index].isNew

  // Reset form state
  isFormActive.value = false
  originalValueParam.value = null
  indexEdit.value = null

  console.log('Param confirmed, isFormActive after:', isFormActive.value)
  console.log('Param field type:', typeof param.field, 'value:', param.field)

  // Emit changes to parent
  emit('update:modelValue', [...paramsList.value])
}

// Handle remove
const handleRemove = (index) => {
  if (isFormActive.value) {
    alert('Por favor complete o cancele la edición actual antes de eliminar una condición')
    return
  }

  if (confirm('¿Está seguro de eliminar esta condición?')) {
    paramsList.value.splice(index, 1)
    emit('update:modelValue', paramsList.value)
  }
}

// Handle set value
const handleSetValue = (index, key, value) => {
  // Parse field to integer when it's the field being set
  if (key === 'field') {
    value = value !== null && value !== undefined ? parseInt(value, 10) : null
    console.log('Setting field value (parsed to int):', value, 'type:', typeof value)
  }

  paramsList.value[index][key] = value

  if (key === 'field') {
    // Reset action, value, and secondValue when field changes
    paramsList.value[index].action = null
    // Initialize value based on the field type
    paramsList.value[index].value = value === 2 ? [] : null
    paramsList.value[index].secondValue = null
  }
}

// Validation method
const validated = () => {
  return isFormActive.value
}

onBeforeMount(() => {
  paramsList.value = JSON.parse(JSON.stringify(props.modelValue)) || []

  // Parse structure for display: split range values into value and secondValue if needed
  // Also ensure field values are integers
  paramsList.value = paramsList.value.map((element) => {
    // Parse field to integer
    if (element.field !== null && element.field !== undefined) {
      element.field = parseInt(element.field, 10)
    }

    if (
      (element.field === 1 || element.field === 3) &&
      Array.isArray(element.value) &&
      element.value.length === 2
    ) {
      return {
        ...element,
        secondValue: element.value[1],
        value: element.value[0],
      }
    }
    return element
  })

  console.log(
    'Component mounted, isFormActive:',
    isFormActive.value,
    'paramsList length:',
    paramsList.value.length,
  )
})

defineExpose({
  validated,
})
</script>
