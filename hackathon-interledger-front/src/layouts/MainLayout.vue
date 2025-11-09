<template>
  <div
    class="h-screen w-screen overflow-hidden grid grid-rows-[auto_1fr_auto] md:grid-cols-[auto_1fr_auto] md:grid-rows-[auto_1fr_auto]"
  >
    <!-- Header -->
    <header
      class="bg-gray-800 text-white p-4 shadow-md md:col-span-3 flex items-center justify-between"
    >
      <h1 class="text-xl font-semibold">Header</h1>
      <button
        class="md:hidden p-2 rounded hover:bg-gray-700 transition-colors"
        @click="toggleSidebar"
        aria-label="Toggle menu"
      >
        open
      </button>
    </header>

    <!-- Aside/Sidebar -->
    <aside
      class="bg-gray-100 border-r border-gray-300 transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:w-64 overflow-y-auto"
      :class="[
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'fixed md:static inset-y-0 left-0 z-30 w-64',
      ]"
    >
      <div class="p-4">
        <h2 class="text-lg font-semibold mb-4">Sidebar</h2>
        <nav class="space-y-2">
          <a href="#" class="block p-2 rounded hover:bg-gray-200 transition-colors">Item 1</a>
          <a href="#" class="block p-2 rounded hover:bg-gray-200 transition-colors">Item 2</a>
          <a href="#" class="block p-2 rounded hover:bg-gray-200 transition-colors">Item 3</a>
        </nav>
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
      @click="toggleSidebar"
    ></div>

    <!-- Main Content -->
    <main class="overflow-y-auto bg-white md:col-start-2">
      <div class="h-full p-2">
        <router-view />
      </div>
    </main>

    <!-- Aside/Sidebar Right - Cart -->
    <aside
      v-if="products.length > 0"
      class="bg-white border-l border-gray-300 transition-transform duration-300 ease-in-out md:translate-x-0 md:relative overflow-y-auto shadow-[-2px_0_8px_rgba(0,0,0,0.1)]"
      :class="[
        products.length > 0 ? 'translate-x-0' : 'translate-x-full',
        'fixed md:static inset-y-0 right-0 z-30 w-35',
      ]"
    >
      <div class="h-full flex flex-col">
        <!-- Subtotal Section -->
        <div class="p-6 border-b border-border-default">
          <h2 class="text-center text-secondary mb-2">Subtotal</h2>
          <p class="text-center text-md text-secondary mb-3">${{ formattedSubtotal }}</p>
          <div v-if="cartStore.qualifiesForFreeShipping" class="text-center mb-2">
            <p class="text-primary text-sm">Tu pedido califica para envío GRATIS.</p>
            <a href="#" class="text-primary underline text-sm">detalles</a>
          </div>
          <button
            class="w-full mt-4 px-2 py-1 border border-border-default rounded-lg bg-white text-secondary hover:bg-primary-4 transition-colors text-xs"
          >
            Ir al carrito
          </button>
        </div>

        <!-- Products List -->
        <div class="flex-1 overflow-y-auto p-4">
          <div
            v-for="p in products"
            :key="p.id"
            class="mb-6 pb-6 border-b border-border-default last:mb-0 last:border-b-0"
          >
            <div class="relative mb-2">
              <img :src="p.image" :alt="p.title" class="w-30 h-30 object-cover" />
            </div>
            <p class="text-secondary font-bold flex items-center justify-center text-md mb-3">
              ${{ p.price.toFixed(2) }}
            </p>
            <div class="flex justify-center">
              <div
                class="flex items-center border border-secondary rounded-lg overflow-hidden w-fit h-8"
              >
                <button
                  @click="cartStore.decrementQuantity(p.id)"
                  class="bg-transparent border-none px-2 py-0.5 cursor-pointer text-sm font-bold text-secondary transition-colors hover:bg-primary-4 select-none disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  <span v-if="p.quantity > 1" class="material-symbols-outlined">
                    <span class="w-full material-symbols-outlined"> remove </span>
                  </span>
                  <span
                    v-if="p.quantity == 1"
                    class="material-symbols-outlined"
                    @click="cartStore.removeProduct(p.id)"
                  >
                    delete
                  </span>
                </button>
                <span class="px-3 py-0.5 font-bold text-secondary text-center select-none text-sm">
                  {{ p.quantity }}
                </span>
                <button
                  @click="cartStore.incrementQuantity(p.id)"
                  class="bg-transparent border-none px-2 py-0.5 cursor-pointer text-sm font-bold text-secondary transition-colors hover:bg-primary-4 select-none shrink-0"
                >
                  <span class="material-symbols-outlined"> add </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Footer -->
    <footer class="p-4 text-center md:col-span-3">
      <p class="text-sm">
        e<img src="@/assets/exos.png" alt="logo" class="inline-block w-4 h-6" />os &copy; 2025
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const isSidebarOpen = ref(false)
const cartStore = useCartStore()

const products = computed(() => cartStore.products)

const formattedSubtotal = computed(() => {
  return cartStore.subtotal.toFixed(2)
})

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>
