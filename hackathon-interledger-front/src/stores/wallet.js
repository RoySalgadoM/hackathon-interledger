import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWalletStore = defineStore('wallet', () => {
  // State
  const wallets = ref([
    {
      value: 'https://ilp.rafiki.money/accounts/gfranklin',
      label: 'George Franklin - Rafiki',
    },
    {
      value: 'https://ilp.rafiki.money/accounts/mjackson',
      label: 'Michael Jackson - Rafiki',
    },
    {
      value: 'https://ilp.gatehub.net/alice',
      label: 'Alice - GateHub',
    },
    {
      value: 'https://ilp.gatehub.net/bob',
      label: 'Bob - GateHub',
    },
  ])

  return {
    wallets,
  }
})
