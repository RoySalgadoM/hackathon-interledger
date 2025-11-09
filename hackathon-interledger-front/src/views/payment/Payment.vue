<template>
  <e-content-layout>
    <template #title>
      <h1>Pago</h1>
    </template>
    <template #description>
      <p>Pago de productos</p>
    </template>
    <template #default>
      <div class="flex flex-col gap-6 max-w-2xl mx-auto">
        <!-- Sección de método de pago -->
        <div class="flex flex-col gap-4 p-6">
          <h2 class="text-xl font-semibold text-(--color-text-secondary)">Método de pago</h2>

          <!-- Cards de wallets -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="(wallet, index) in paymentMethods"
              :key="index"
              @click="selectWallet(wallet.value)"
              :class="[
                'cursor-pointer rounded-lg border p-5 transition-all relative overflow-hidden',
                'bg-gray-200/50 backdrop-blur-md border-gray-300/50',
                'shadow-lg',
                selectedPaymentMethod === wallet.value
                  ? 'ring-2 ring-offset-2 ring-primary bg-gray-300/50'
                  : 'hover:bg-gray-300/50  hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-0.5',
              ]"
            >
              <!-- Contenido del wallet -->
              <div class="flex flex-col gap-2 relative z-10">
                <h3 class="text-lg font-semibold text-(--color-text-secondary) m-0">
                  {{ wallet.label }}
                </h3>
                <p class="text-sm text-text-secondary-2 m-0 break-all">
                  {{ wallet.value }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Botón de pago -->
        <div class="flex justify-center">
          <e-btn
            variant="primary"
            @click="handlePay"
            :disabled="!selectedPaymentMethod"
            class="px-8 py-3 text-lg"
          >
            Iniciar pago
          </e-btn>
        </div>

        <!-- Sección de escaneo QR -->
        <div
          v-if="validated"
          class="flex flex-col items-center gap-6 p-8 rounded-lg bg-primary-4 border border-border-default"
        >
          <div class="flex flex-col items-center gap-2">
            <h2 class="text-xl font-semibold text-(--color-text-secondary)">
              Escanea el código QR
            </h2>
            <p class="text-sm text-text-secondary-2 text-center">
              Posiciona el código QR dentro del marco para procesar el pago
            </p>
          </div>

          <div v-if="paymentStore.loading" class="flex flex-col items-center gap-3">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p class="text-sm text-text-secondary-2">Procesando pago...</p>
          </div>

          <div
            v-else-if="showQrReader"
            class="flex justify-center p-4 rounded-lg bg-white shadow-md"
          >
            <e-qr-code
              mode="read"
              :size="300"
              error-correction-level="M"
              @scanned="handleQRScanned"
              @error="handleQRError"
            />
          </div>
        </div>

        <!-- Mostrar datos del QR escaneado -->
        <div
          v-if="qrData && !paymentStore.loading && !paymentStore.paymentResponse"
          class="flex flex-col gap-4 p-6 rounded-lg bg-primary-3 border border-primary-2 shadow-sm"
        >
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 class="text-lg font-semibold text-(--color-text-secondary)">
              QR escaneado exitosamente
            </h3>
          </div>
          <div class="p-4 rounded-md bg-white border border-border-default">
            <p class="text-sm font-medium text-text-secondary-2 mb-2">Datos recibidos:</p>
            <pre
              class="text-xs text-(--color-text-secondary) overflow-x-auto p-3 bg-primary-4 rounded border border-border-default"
              >{{ JSON.stringify(qrData, null, 2) }}</pre
            >
          </div>
        </div>
      </div>
    </template>
  </e-content-layout>

  <!-- Modal de respuesta exitosa del pago -->
  <e-modal
    v-model="showSuccessModal"
    title="Pago procesado exitosamente"
    @close="handleCloseSuccessModal"
  >
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-center">
        <div class="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-2">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <div v-if="qrData" class="p-4 rounded-md bg-gray-50 border border-border-default">
        <p class="text-sm font-medium text-text-secondary-2 mb-2">Datos del QR:</p>
        <pre
          class="text-xs text-(--color-text-secondary) overflow-x-auto p-3 bg-white rounded border border-border-default"
          >{{ JSON.stringify(qrData, null, 2) }}</pre
        >
      </div>
      <div
        v-if="paymentStore.paymentResponse"
        class="p-4 rounded-md bg-green-50 border border-green-200"
      >
        <p class="text-sm font-medium text-green-800 mb-2">Respuesta del servidor:</p>
        <pre
          class="text-xs text-green-700 overflow-x-auto p-3 bg-white rounded border border-green-200"
          >{{ JSON.stringify(paymentStore.paymentResponse, null, 2) }}</pre
        >
      </div>
    </div>
    <template #footer>
      <e-btn variant="primary" @click="handleCloseSuccessModal">Aceptar</e-btn>
    </template>
  </e-modal>

  <!-- Modal de error -->
  <e-modal v-model="showErrorModal" title="Error en el pago" @close="handleCloseErrorModal">
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-center">
        <div class="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-2">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <div class="p-4 rounded-md bg-red-50 border border-red-200">
        <p class="text-sm font-semibold text-red-800 mb-2">Detalles del error:</p>
        <p class="text-sm text-red-700">{{ qrError || paymentStore.error }}</p>
      </div>
    </div>
    <template #footer>
      <e-btn variant="secondary" @click="handleCloseErrorModal">Cerrar</e-btn>
    </template>
  </e-modal>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { usePaymentStore } from '@/stores/payment'
import { useCartStore } from '@/stores/cart'
import { useWalletStore } from '@/stores/wallet'

const paymentStore = usePaymentStore()
const cartStore = useCartStore()
const walletStore = useWalletStore()

const validated = ref(false)
const qrData = ref(null)
const qrError = ref(null)
const selectedPaymentMethod = ref('')
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const showQrReader = ref(false)

// Use computed to reference wallet store state directly
const paymentMethods = computed(() => walletStore.wallets)

const selectWallet = (value) => {
  selectedPaymentMethod.value = value
}

watch(
  () => paymentMethods.value,
  (newWallets) => {
    if (newWallets.length > 0 && !selectedPaymentMethod.value) {
      selectedPaymentMethod.value = newWallets[0].value
    }
  },
  { immediate: true },
)
onMounted(async () => {
  try {
    if (paymentMethods.value.length > 0 && !selectedPaymentMethod.value) {
      selectedPaymentMethod.value = paymentMethods.value[0].value
    }
  } catch (error) {
    console.error('Error al cargar wallets:', error)
  }
})

const handlePay = () => {
  validated.value = true
  showQrReader.value = true
  // Limpiar datos anteriores cuando se inicia el escaneo
  qrData.value = null
  qrError.value = null
  paymentStore.clearPayment()
  showSuccessModal.value = false
  showErrorModal.value = false
}

const handleQRScanned = async (data) => {
  console.log('QR Code escaneado:', data)

  // Close QR reader immediately after scanning
  showQrReader.value = false

  try {
    qrError.value = null
    showErrorModal.value = false

    // Llamar al store para procesar el pago
    await paymentStore.processPayment({
      merchant_account: data.url,
      client_account: selectedPaymentMethod.value,
      amount: data.amount,
      id: data.id,
    })

    // Si todo salió bien, guardar los datos del QR y mostrar modal de éxito
    qrData.value = data
    showSuccessModal.value = true
    console.log('Pago procesado exitosamente:', paymentStore.paymentResponse)
  } catch (error) {
    console.error('Error al procesar el pago:', error)
    // El error ya está manejado en el store
    qrError.value = paymentStore.error
    qrData.value = null
    showErrorModal.value = true
  }
}

const handleQRError = (error) => {
  console.error('Error al escanear QR:', error)
  qrError.value = `${error.type}: ${error.message}`
  qrData.value = null
  showErrorModal.value = true
}

const handleCloseSuccessModal = () => {
  showSuccessModal.value = false
  // Opcional: limpiar datos después de cerrar el modal
  // qrData.value = null
  // paymentStore.clearPayment()
}

const handleCloseErrorModal = () => {
  showErrorModal.value = false
  qrError.value = null
  paymentStore.clearPayment()
}
</script>
