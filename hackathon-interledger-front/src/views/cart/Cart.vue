<template>
  <e-content-layout>
    <template #title>
      <h1>Carrito</h1>
    </template>
    <template #description>
      <p>Productos en tu carrito</p>
    </template>
    <template #tr-content>
      <div class="flex flex-col items-end gap-2 w-full">
        <label class="text-sm font-semibold text-secondary"
          >Subtotal ({{ products.length == 1 ? '1 producto' : `${products.length} productos` }}):
          ${{ formattedSubtotal }}</label
        >
        <e-btn variant="primary" @click="handleProceedToPayment" class="w-full md:w-auto">
          <span>
            <i class="fa-solid fa-cart-shopping"></i>
          </span>
          <span> Proceder al pago </span>
        </e-btn>
      </div>
    </template>
    <template #default>
      <div v-if="products.length === 0" class="empty-cart">
        <p>Tu carrito está vacío</p>
      </div>
      <div v-else class="cart-container">
        <div class="cart-header">
          <h2 class="cart-title">Carrito de compras</h2>
        </div>
        <div class="cart-items">
          <article class="cart-item" v-for="p in products" :key="p.id">
            <div class="item-image">
              <img :src="p.image" :alt="p.title" />
            </div>
            <div class="item-content">
              <div class="item-description">
                <h3 class="item-title">{{ p.title }}</h3>
                <p class="item-description">{{ p.desc }}</p>
              </div>
              <div class="item-price">
                <span class="price">${{ p.price.toFixed(2) }}</span>
              </div>
              <div class="item-quantity">
                <div class="quantity-controls">
                  <button
                    @click="
                      p.quantity > 1
                        ? cartStore.decrementQuantity(p.id)
                        : cartStore.removeProduct(p.id)
                    "
                    class="quantity-btn"
                    :aria-label="
                      p.quantity > 1 ? `Disminuir cantidad de ${p.title}` : `Eliminar ${p.title}`
                    "
                  >
                    <span v-if="p.quantity > 1" class="material-symbols-outlined">remove</span>
                    <span v-else class="material-symbols-outlined">delete</span>
                  </button>
                  <span class="quantity-value">{{ p.quantity }}</span>
                  <button
                    @click="cartStore.incrementQuantity(p.id)"
                    class="quantity-btn"
                    :aria-label="`Aumentar cantidad de ${p.title}`"
                  >
                    <span class="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </template>
  </e-content-layout>

  <!-- Modal de pago con QR -->
  <e-modal v-model="showPaymentModal" title="Proceder al pago" @close="handleCloseModal">
    <div class="payment-modal-content">
      <div class="payment-info">
        <p class="payment-amount">
          Total a pagar: <strong>${{ formattedSubtotal }}</strong>
        </p>
        <p class="payment-instructions">
          Escanea el código QR con tu aplicación de pago para completar la transacción
        </p>
      </div>
      <div class="qr-container" v-if="paymentData">
        <e-qr-code :data="paymentData" mode="generate" :size="300" error-correction-level="M" />
      </div>
    </div>
    <template #footer>
      <e-btn variant="secondary" @click="handleCloseModal">Cancelar</e-btn>
    </template>
  </e-modal>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const products = computed(() => cartStore.products)
const formattedSubtotal = computed(() => {
  return cartStore.subtotal.toFixed(2)
})

const showPaymentModal = ref(false)
const paymentData = ref(null)

const handleProceedToPayment = () => {
  paymentData.value = {
    id: '1234567890',
    url: 'https://example.com',
    amount: formattedSubtotal.value,
  }
  showPaymentModal.value = true
}

const handleCloseModal = () => {
  showPaymentModal.value = false
}
</script>

<style scoped>
.empty-cart {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: var(--color-text-secondary-2);
  font-size: 18px;
}

.cart-container {
  width: 100%;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border-default, #e5e7eb);
}

.cart-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin: 0;
}

.cart-count {
  font-size: 14px;
  color: var(--color-text-secondary-2);
  margin: 0;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: var(--color-text-primary);
  border-radius: 8px;
  border: 1px solid var(--color-border-default, #e5e7eb);
  transition: box-shadow 0.2s ease;
}

.cart-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.item-image {
  flex-shrink: 0;
  width: 180px;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-primary-4);
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: space-between;
}

.item-description {
  flex: 1;
}

.item-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-price {
  display: flex;
  align-items: center;
}

.price {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.item-quantity {
  display: flex;
  align-items: center;
}

.quantity-controls {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border-default, #e5e7eb);
  border-radius: 6px;
  overflow: hidden;
  width: fit-content;
}

.quantity-btn {
  background: transparent;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
}

.quantity-btn:hover:not(:disabled) {
  background: var(--color-primary-4);
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-btn .material-symbols-outlined {
  font-size: 18px;
  user-select: none;
}

.quantity-value {
  padding: 8px 16px;
  font-weight: 600;
  color: var(--color-text-secondary);
  min-width: 50px;
  text-align: center;
  border-left: 1px solid var(--color-border-default, #e5e7eb);
  border-right: 1px solid var(--color-border-default, #e5e7eb);
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    gap: 12px;
  }

  .item-image {
    width: 100%;
    height: 200px;
  }

  .item-content {
    gap: 16px;
  }

  .cart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

.payment-modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0;
}

.payment-info {
  text-align: center;
  width: 100%;
}

.payment-amount {
  font-size: 1.5rem;
  color: var(--color-text-secondary);
  margin: 0 0 1rem 0;
}

.payment-amount strong {
  color: var(--color-primary);
  font-weight: 600;
}

.payment-instructions {
  font-size: 0.875rem;
  color: var(--color-text-secondary-2);
  margin: 0;
  line-height: 1.5;
}

.qr-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: var(--color-primary-4);
  border-radius: 8px;
  width: 100%;
}

@media (max-width: 768px) {
  .payment-modal-content {
    gap: 1.5rem;
  }

  .payment-amount {
    font-size: 1.25rem;
  }

  .payment-instructions {
    font-size: 0.8125rem;
  }
}
</style>
