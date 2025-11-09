<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useWalletStore } from '@/stores/wallet'
import { useRoute } from 'vue-router'

const walletStore = useWalletStore()
const route = useRoute()
onMounted(async () => {
  try {
    if (localStorage.getItem('authToken') && route.name !== 'home') {
      console.log('fetching wallets')
      console.log(route.name)
      console.log(localStorage.getItem('authToken'))
      await walletStore.getWallets()
    }
  } catch (error) {
    console.error('Error fetching wallets:', error)
  }
})
</script>
