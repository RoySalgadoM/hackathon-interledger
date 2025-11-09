<template>
  <span
    :class="['icon', `icon--${size}`, { 'icon--filled': filled }]"
    :style="iconStyles"
    :data-testid="dataTestId || `icon-${name}`"
    :aria-label="ariaLabel || name"
    role="img"
  >
    {{ name }}
  </span>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'xlarge'].includes(value),
  },
  color: {
    type: String,
    default: '',
  },
  filled: {
    type: Boolean,
    default: false,
  },
  dataTestId: {
    type: String,
    default: '',
  },
  ariaLabel: {
    type: String,
    default: '',
  },
})

const iconStyles = computed(() => {
  const styles = {}

  if (props.color) {
    styles.color = props.color
  }

  if (props.filled) {
    styles.fontVariationSettings = "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
  } else {
    styles.fontVariationSettings = "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"
  }

  return styles
})
</script>
