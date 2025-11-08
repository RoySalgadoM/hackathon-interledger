<template>
  <div class="input-wrapper">
    <label
      v-if="label"
      :for="inputId"
      :class="['input-label', labelColor]"
      :style="labelColor && !labelColor.startsWith('text-') ? { color: labelColor } : {}"
    >
      {{ label }}
      <span v-if="required" class="input-required">*</span>
    </label>
    <input
      :id="inputId"
      :class="['input', `input--${size}`, { 'input--error': error, 'input--disabled': disabled }]"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :readonly="readonly"
      :maxlength="maxlength"
      :minlength="minlength"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :aria-label="label || placeholder"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <span v-if="error" :id="`${inputId}-error`" class="input-error" role="alert">{{ error }}</span>
    <span v-if="hint && !error" :id="`${inputId}-hint`" class="input-hint">{{ hint }}</span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) =>
      ['text', 'email', 'password', 'number', 'tel', 'url', 'search'].includes(value),
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
  maxlength: {
    type: Number,
    default: null,
  },
  minlength: {
    type: Number,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  labelColor: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'input'])

const inputId = computed(() => props.id || `input-${Math.random().toString(36).substr(2, 9)}`)

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
  emit('input', event)
}

const handleBlur = (event) => {
  emit('blur', event)
}

const handleFocus = (event) => {
  emit('focus', event)
}
</script>
