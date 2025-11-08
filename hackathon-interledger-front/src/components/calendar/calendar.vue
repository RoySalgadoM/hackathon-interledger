<template>
  <div class="calendar-wrapper">
    <label v-if="label" :for="calendarId" class="calendar-label">
      {{ label }}
      <span v-if="required" class="calendar-required">*</span>
    </label>
    <input
      :id="calendarId"
      :class="[
        'calendar',
        `calendar--${size}`,
        { 'calendar--error': error, 'calendar--disabled': disabled },
      ]"
      type="date"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :readonly="readonly"
      :min="min"
      :max="max"
      :aria-label="label || placeholder"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${calendarId}-error` : hint ? `${calendarId}-hint` : undefined"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
    />
    <span v-if="error" :id="`${calendarId}-error`" class="calendar-error" role="alert">{{
      error
    }}</span>
    <span v-if="hint && !error" :id="`${calendarId}-hint`" class="calendar-hint">{{ hint }}</span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Fecha',
  },
  placeholder: {
    type: String,
    default: '',
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
  readonly: {
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
  min: {
    type: String,
    default: null,
  },
  max: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'change', 'blur', 'focus', 'input'])

const calendarId = computed(() => props.id || `calendar-${Math.random().toString(36).substr(2, 9)}`)

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
  emit('input', event)
}

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
