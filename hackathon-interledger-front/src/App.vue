<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useWalletStore } from '@/stores/wallet'

const walletStore = useWalletStore()

onMounted(async () => {
  try {
    await walletStore.getWallets()
  } catch (error) {
    console.error('Error fetching wallets:', error)
  }
})
</script>
