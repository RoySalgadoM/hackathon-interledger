<template>
  <div class="container">
    <h1>Componentes Reutilizables</h1>

    <section class="section">
      <h2>Input</h2>
      <EInput v-model="inputValue" label="Nombre" placeholder="Ingresa tu nombre" required />
      <EInput
        v-model="emailValue"
        type="email"
        label="Email"
        placeholder="correo@ejemplo.com"
        hint="Ingresa un email válido"
      />
      <EInput v-model="errorInput" label="Campo con error" error="Este campo es requerido" />
    </section>

    <section class="section">
      <h2>Select</h2>
      <ESelect
        v-model="selectValue"
        label="Selecciona una opción"
        :options="selectOptions"
        placeholder="Elige una opción..."
        required
      />
    </section>

    <section class="section">
      <h2>Calendar</h2>
      <ECalendar
        v-model="calendarValue"
        label="Fecha de nacimiento"
        required
        hint="Selecciona tu fecha de nacimiento"
      />
    </section>

    <section class="section">
      <h2>Buttons</h2>
      <div class="button-group">
        <EBtn variant="primary">Primary</EBtn>
        <EBtn variant="secondary">Secondary</EBtn>
        <EBtn variant="outline">Outline</EBtn>
        <EBtn variant="danger">Danger</EBtn>
      </div>
      <div class="button-group">
        <EBtn size="small">Small</EBtn>
        <EBtn size="medium">Medium</EBtn>
        <EBtn size="large">Large</EBtn>
        <EBtn size="large">Large</EBtn>
      </div>
      <EBtn variant="primary" full-width @click="handleButtonClick">Full Width Button</EBtn>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
const emailValue = ref('')
const errorInput = ref('')
const selectValue = ref('')
const calendarValue = ref('')

const selectOptions = [
  { value: 'opcion1', label: 'Opción 1' },
  { value: 'opcion2', label: 'Opción 2' },
  { value: 'opcion3', label: 'Opción 3' },
  { value: 'opcion4', label: 'Opción 4', disabled: true },
]

const handleButtonClick = () => {
  console.log('Button clicked!')
  alert('¡Botón clickeado!')
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
  color: var(--color-text-secondary);
}

h2 {
  margin-bottom: 15px;
  color: var(--color-text-secondary);
  font-size: 1.5rem;
}

.section {
  margin-bottom: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}
</style>
