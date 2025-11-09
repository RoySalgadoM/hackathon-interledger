<template>
  <e-content-layout>
    <template #title>
      <h1>Confirmación de Pago</h1>
    </template>
    <template #description>
      <p>Tu transacción ha sido procesada</p>
    </template>
    <template #default>
      <div class="ticket-container">
        <div class="ticket" :class="ticketClass">
          <div class="ticket-perforation ticket-perforation-top"></div>
          <div class="ticket-content">
            <div class="ticket-header">
              <div class="ticket-icon">
                <div v-if="isCompleted" class="icon-success">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div v-else class="icon-rejected">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
              <h2 class="ticket-title">
                {{ statusTitle }}
              </h2>
              <p class="ticket-subtitle">
                {{ statusSubtitle }}
              </p>
            </div>
            <div class="ticket-divider"></div>
            <div class="ticket-details">
              <div class="ticket-row">
                <span class="ticket-label">ID DE TRANSACCIÓN:</span>
                <span class="ticket-value">{{ requestId || 'N/A' }}</span>
              </div>
              <div class="ticket-row">
                <span class="ticket-label">ESTADO:</span>
                <span class="ticket-value">{{ statusLabel }}</span>
              </div>
              <div class="ticket-row">
                <span class="ticket-label">FECHA & HORA:</span>
                <span class="ticket-value">{{ formattedDate }}</span>
              </div>
            </div>
            <div class="ticket-divider"></div>
            <div class="ticket-actions">
              <e-btn variant="primary" @click="goToProducts" data-testid="btn-go-products">
                Ir a Productos
              </e-btn>
              <e-btn variant="secondary" @click="goToCart" data-testid="btn-go-cart">
                Ver Carrito
              </e-btn>
            </div>
          </div>
          <div class="ticket-perforation ticket-perforation-bottom"></div>
        </div>
      </div>
    </template>
  </e-content-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Estado del pago
const paymentStatus = ref(null)
const requestId = ref(null)

// Estados computados
const isCompleted = computed(() => paymentStatus.value === 'completed')
const isRejectedByClient = computed(() => paymentStatus.value === 'rejected_by_client')
const isRejectedByPreauth = computed(() => paymentStatus.value === 'rejected_by_preauth')

const ticketClass = computed(() => {
  if (isCompleted.value) return 'ticket-success'
  if (isRejectedByClient.value || isRejectedByPreauth.value) return 'ticket-rejected'
  return ''
})

const statusTitle = computed(() => {
  if (isCompleted.value) return '¡Pago Exitoso!'
  if (isRejectedByClient.value) return 'Pago Rechazado por el Cliente'
  if (isRejectedByPreauth.value) return 'Pago Rechazado por Validación'
  return 'Estado Desconocido'
})

const statusSubtitle = computed(() => {
  if (isCompleted.value) return 'Tu pago ha sido procesado correctamente'
  if (isRejectedByClient.value) return 'El cliente ha declinado la transacción'
  if (isRejectedByPreauth.value) return 'El pago no pasó las validaciones de seguridad'
  return 'No se pudo determinar el estado de la transacción'
})

const statusLabel = computed(() => {
  if (isCompleted.value) return 'Completado'
  if (isRejectedByClient.value) return 'Rechazado por Cliente'
  if (isRejectedByPreauth.value) return 'Rechazado por Validación'
  return 'Desconocido'
})

const formattedDate = computed(() => {
  const now = new Date()
  const months = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ]
  const day = now.getDate()
  const month = months[now.getMonth()]
  const year = now.getFullYear()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${day} ${month} ${year} • ${hours}:${minutes}`
})

onMounted(() => {
  // Obtener datos de la query string
  paymentStatus.value = route.query.status || 'completed'
  requestId.value = route.query.requestId || 'N/A'
})

// Navegación
const goToProducts = () => {
  router.push({ name: 'products' })
}

const goToCart = () => {
  router.push({ name: 'cart' })
}
</script>

<style scoped>
.ticket-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
}

.ticket {
  position: relative;
  max-width: 500px;
  width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.ticket-success {
  border-top: 4px solid #10b981;
}

.ticket-rejected {
  border-top: 4px solid #ef4444;
}

/* Bordes perforados */
.ticket-perforation {
  position: relative;
  height: 20px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  overflow: hidden;
}

.ticket-perforation::before,
.ticket-perforation::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  border-radius: 50%;
  transform: translateY(-50%);
}

.ticket-perforation-top::before {
  left: -10px;
}

.ticket-perforation-top::after {
  right: -10px;
}

.ticket-perforation-bottom::before {
  left: -10px;
}

.ticket-perforation-bottom::after {
  right: -10px;
}

/* Patrón de puntos para efecto perforado */
.ticket-perforation-top {
  background-image: repeating-linear-gradient(
    to right,
    transparent,
    transparent 18px,
    #d1d5db 18px,
    #d1d5db 20px
  );
}

.ticket-perforation-bottom {
  background-image: repeating-linear-gradient(
    to right,
    transparent,
    transparent 18px,
    #d1d5db 18px,
    #d1d5db 20px
  );
}

.ticket-content {
  padding: 2rem 1.5rem;
}

.ticket-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.ticket-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.icon-success {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.icon-success svg {
  width: 36px;
  height: 36px;
}

.icon-rejected {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.icon-rejected svg {
  width: 36px;
  height: 36px;
}

.ticket-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  margin: 0 0 0.5rem 0;
}

.ticket-subtitle {
  font-size: 0.875rem;
  color: var(--color-text-secondary-2);
  margin: 0;
}

.ticket-divider {
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    transparent,
    transparent 8px,
    #d1d5db 8px,
    #d1d5db 10px
  );
  margin: 1.5rem 0;
}

.ticket-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.ticket-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ticket-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ticket-value {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text-secondary);
}

.ticket-actions {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

@media (min-width: 640px) {
  .ticket-actions {
    flex-direction: row;
  }
}

@media (max-width: 640px) {
  .ticket-content {
    padding: 1.5rem 1rem;
  }

  .ticket-title {
    font-size: 1.5rem;
  }
}
</style>
