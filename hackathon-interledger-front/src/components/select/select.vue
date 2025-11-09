<template>
  <div class="select-wrapper" ref="selectWrapper">
    <label v-if="label" :for="selectId" class="select-label">
      {{ label }}
      <span v-if="required" class="select-required">*</span>
    </label>

    <!-- Multiple select mode with custom dropdown -->
    <template v-if="multiple">
      <div class="select-chips-container" @click="toggleDropdown">
        <span v-if="selectedLabels.length === 0" class="select-placeholder">
          {{ placeholder }}
        </span>
        <span v-for="(label, index) in selectedLabels" :key="index" class="select-chip">
          {{ label }}
          <button
            type="button"
            class="select-chip-remove"
            @click.stop="removeOption(getValueByLabel(label))"
          >
            ×
          </button>
        </span>
        <span class="select-arrow" :class="{ 'select-arrow-open': isDropdownOpen }">▼</span>
      </div>

      <!-- Custom dropdown with checkboxes -->
      <div v-if="isDropdownOpen" class="select-dropdown">
        <label
          v-for="option in options"
          :key="option.value"
          class="select-dropdown-option"
          :class="{ 'select-dropdown-option--disabled': option.disabled }"
        >
          <input
            type="checkbox"
            :value="option.value"
            :checked="isSelected(option.value)"
            :disabled="option.disabled"
            @change="handleCheckboxChange(option.value)"
            class="select-dropdown-checkbox"
          />
          <span>{{ option.label }}</span>
        </label>
      </div>
    </template>

    <!-- Single select mode (original) -->
    <select
      v-else
      :id="selectId"
      :class="[
        'select',
        `select--${size}`,
        { 'select--error': error, 'select--disabled': disabled },
      ]"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :aria-label="label || placeholder"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>

    <span v-if="error" :id="`${selectId}-error`" class="select-error" role="alert">{{
      error
    }}</span>
    <span v-if="hint && !error" :id="`${selectId}-hint`" class="select-hint">{{ hint }}</span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    default: '',
  },
  options: {
    type: Array,
    required: true,
    validator: (value) => {
      return (
        Array.isArray(value) &&
        value.every(
          (option) =>
            typeof option === 'object' && option !== null && 'value' in option && 'label' in option,
        )
      )
    },
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Selecciona una opción...',
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'change', 'blur', 'focus'])

const selectWrapper = ref(null)
const isDropdownOpen = ref(false)
const selectId = computed(() => props.id || `select-${Math.random().toString(36).substr(2, 9)}`)

const selectedLabels = computed(() => {
  if (!props.multiple || !Array.isArray(props.modelValue)) return []
  return props.modelValue
    .map((value) => {
      const option = props.options.find((opt) => opt.value === value)
      return option ? option.label : null
    })
    .filter((label) => label !== null)
})

const getValueByLabel = (label) => {
  const option = props.options.find((opt) => opt.label === label)
  return option ? option.value : null
}

const isSelected = (value) => {
  return Array.isArray(props.modelValue) && props.modelValue.includes(value)
}

const toggleDropdown = () => {
  if (!props.disabled) {
    isDropdownOpen.value = !isDropdownOpen.value
  }
}

const handleCheckboxChange = (value) => {
  const currentValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  const index = currentValue.indexOf(value)

  if (index > -1) {
    currentValue.splice(index, 1)
  } else {
    currentValue.push(value)
  }

  emit('update:modelValue', currentValue)
  emit('change', currentValue)
}

const handleChange = (event) => {
  emit('update:modelValue', event.target.value)
  emit('change', event)
}

const removeOption = (value) => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    const newValue = props.modelValue.filter((v) => v !== value)
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}

const handleBlur = (event) => {
  emit('blur', event)
}

const handleFocus = (event) => {
  emit('focus', event)
}

const handleClickOutside = (event) => {
  if (selectWrapper.value && !selectWrapper.value.contains(event.target)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
