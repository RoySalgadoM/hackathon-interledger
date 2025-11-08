<template>
  <div
    class="h-screen w-screen overflow-hidden grid grid-rows-[auto_1fr_auto] md:grid-cols-[auto_1fr] md:grid-rows-[auto_1fr_auto]"
  >
    <!-- Header -->
    <header
      class="bg-gray-800 text-white p-4 shadow-md md:col-span-2 flex items-center justify-between"
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
      <div class="p-4 md:p-6 lg:p-8">
        <router-view />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white p-4 text-center md:col-span-2">
      <p class="text-sm">eXos &copy; 2025</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>
