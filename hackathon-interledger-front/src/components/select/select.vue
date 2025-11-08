<template>
  <div class="select-wrapper">
    <label v-if="label" :for="selectId" class="select-label">
      {{ label }}
      <span v-if="required" class="select-required">*</span>
    </label>
    <select
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
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
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

const selectId = computed(() => props.id || `select-${Math.random().toString(36).substr(2, 9)}`)

const handleChange = (event) => {
  emit('update:modelValue', event.target.value)
  emit('change', event)
}

const handleBlur = (event) => {
  emit('blur', event)
}

const handleFocus = (event) => {
  emit('focus', event)
}
</script>
