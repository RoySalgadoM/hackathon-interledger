<template>
  <e-content-layout>
    <template #title>
      <h1>Datos del pago</h1>
    </template>
    <template #description>
      <p>Datos del pago</p>
    </template>
    <template #default>
      <div class="flex flex-col gap-4">
        {{ resultPayment }}
      </div>
    </template>
  </e-content-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { result } = route.query
const resultPayment = ref(result)
</script>

<style></style>
