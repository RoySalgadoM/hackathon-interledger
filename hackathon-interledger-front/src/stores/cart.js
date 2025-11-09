import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const products = ref([])

  const addProductToCart = (productData) => {
    const existingProduct = products.value.find((p) => p.id === productData.id)

    if (existingProduct) {
      existingProduct.quantity++
    } else {
      products.value.push({
        id: productData.id,
        title: productData.title,
        desc: productData.desc,
        image: productData.image,
        quantity: 1,
        price: parseFloat(productData.price),
        badge: productData.badge || null,
      })
    }
  }

  const incrementQuantity = (productId) => {
    const product = products.value.find((p) => p.id === productId)
    if (product) {
      product.quantity++
    }
  }

  const decrementQuantity = (productId) => {
    const product = products.value.find((p) => p.id === productId)
    if (product && product.quantity > 1) {
      product.quantity--
    }
  }

  const removeProduct = (productId) => {
    const index = products.value.findIndex((p) => p.id === productId)
    if (index >= 0) {
      products.value.splice(index, 1)
    }
  }

  const subtotal = computed(() => {
    return products.value.reduce((sum, product) => {
      return sum + product.price * product.quantity
    }, 0)
  })

  const qualifiesForFreeShipping = computed(() => {
    // Califica para envío gratis si el subtotal es mayor a $1000
    return subtotal.value >= 1000
  })

  return {
    products,
    addProductToCart,
    incrementQuantity,
    decrementQuantity,
    removeProduct,
    subtotal,
    qualifiesForFreeShipping,
  }
})
