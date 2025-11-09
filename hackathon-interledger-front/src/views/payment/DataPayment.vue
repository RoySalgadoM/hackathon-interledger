<template>
  <e-content-layout>
    <template #title>
      <h1>Resultado del pago</h1>
    </template>
    <template #description>
      <p>Estado de tu transacción</p>
    </template>
    <template #default>
      <div class="ticket-container">
        <div class="ticket" :class="{ 'ticket-success': isSuccess, 'ticket-rejected': isRejected }">
          <div class="ticket-perforation ticket-perforation-top"></div>
          <div class="ticket-content">
            <div class="ticket-header">
              <div class="ticket-icon">
                <div v-if="isSuccess" class="icon-success">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div v-else-if="isRejected" class="icon-rejected">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
              <h2 class="ticket-title">
                {{ isSuccess ? '¡Gracias!' : 'Pago rechazado' }}
              </h2>
              <p class="ticket-subtitle">
                {{
                  isSuccess
                    ? 'Tu ticket ha sido emitido exitosamente'
                    : 'El vendedor ha declinado el pago'
                }}
              </p>
            </div>
            <div class="ticket-divider"></div>
            <div class="ticket-details">
              <div class="ticket-row">
                <span class="ticket-label">TICKET ID:</span>
                <span class="ticket-value">{{ ticketId || 'N/A' }}</span>
              </div>
              <div class="ticket-row">
                <span class="ticket-label">FECHA & HORA:</span>
                <span class="ticket-value">{{ formattedDate }}</span>
              </div>
            </div>
            <div class="ticket-divider"></div>
          </div>
          <div class="ticket-perforation ticket-perforation-bottom"></div>
        </div>
      </div>
    </template>
  </e-content-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Parsear el resultado del pago
const paymentStatus = ref(null)
const paymentData = ref(null)

// Datos del ticket
const ticketId = ref(null)

// Estados computados
const isSuccess = computed(() => paymentStatus.value === 'success')
const isRejected = computed(() => paymentStatus.value === 'grant_rejected')

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
  try {
    const { result } = route.query
    if (result) {
      // Intentar parsear como JSON
      try {
        const parsed = JSON.parse(decodeURIComponent(result))
        paymentData.value = parsed
        paymentStatus.value = parsed.status || parsed.result || result
      } catch {
        // Si no es JSON, usar el valor directamente
        paymentStatus.value = result
      }

      // Obtener datos adicionales si están disponibles
      if (paymentData.value) {
        ticketId.value = paymentData.value.ticketId || paymentData.value.id || generateTicketId()
      } else {
        ticketId.value = generateTicketId()
      }
    } else {
      // Valores por defecto si no hay resultado
      paymentStatus.value = 'success'
      ticketId.value = generateTicketId()
    }
  } catch (error) {
    console.error('Error al procesar el resultado del pago:', error)
    paymentStatus.value = 'success'
    ticketId.value = generateTicketId()
  }
})

function generateTicketId() {
  return Math.random().toString().slice(2, 15)
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

.ticket-perforation::after {
  box-shadow: 0 0 0 50px linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
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

@media (max-width: 640px) {
  .ticket-content {
    padding: 1.5rem 1rem;
  }

  .ticket-title {
    font-size: 1.5rem;
  }
}
</style>
