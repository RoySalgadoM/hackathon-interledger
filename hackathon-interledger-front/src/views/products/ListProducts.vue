<template>
  <e-content-layout>
    <template #title>
      <h1>Productos</h1>
    </template>
    <template #description>
      <p>Esta es la lista de productos</p>
    </template>
    <template #default>
      <div class="products-header">
        <h1>Productos</h1>
        <p class="count">Total: {{ products.length }}</p>
      </div>
      <div class="grid pb-10" id="products">
        <article class="card" v-for="p in products" :key="p.id">
          <div class="image-wrapper">
            <a class="media" href="#" :data-id="p.id">
              <img :src="p.image" :alt="p.title" />
            </a>
            <span v-if="p.badge" class="badge" :class="p.badge.toLowerCase().replace(/\s+/g, '-')">
              {{ p.badge }}
            </span>
          </div>
          <div class="meta">
            <div class="title">{{ p.title }}</div>
            <div class="description">{{ p.desc }}</div>
            <div class="price-wrapper">
              <span class="price">${{ p.price }}</span>
              <span v-if="p.originalPrice" class="original-price">${{ p.originalPrice }}</span>
            </div>
            <e-btn
              class="add-to-cart"
              variant="primary"
              size="small"
              :aria-label="`Add ${p.title} to cart`"
              @click="() => handleAddToCart(p)"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </e-btn>
          </div>
        </article>
      </div>
    </template>
  </e-content-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const handleAddToCart = (product) => {
  const productData = {
    id: product.id,
    title: product.title,
    image: product.image,
    desc: product.desc,
    price: product.price,
    badge: product.badge,
  }
  cartStore.addProductToCart(productData)
}

const products = ref([
  {
    id: 1,
    title: 'Boleto Autobús — Ciudad de México',
    price: '45.00',
    originalPrice: null,
    category: 'transport',
    image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG8aqbi8evCmTVQjsSeXUUwRcK6aDJusjguQ&s`,
    desc: 'Boleto de autobús de primera clase con asientos reclinables y aire acondicionado.',
    badge: 'NEW',
  },
  {
    id: 2,
    title: 'Boleto Autobús — Guadalajara',
    price: '38.00',
    originalPrice: null,
    category: 'transport',
    image: `https://www.tuttoilmondo.com/wp-content/uploads/2023/12/WhatsApp-Image-2023-11-30-at-15.00.46-1080x675.jpeg`,
    desc: 'Viaje cómodo y seguro hacia Guadalajara con servicio de entretenimiento a bordo.',
    badge: null,
  },
  {
    id: 3,
    title: 'Boleto Autobús — Cancún',
    price: '85.00',
    originalPrice: '120.00',
    category: 'transport',
    image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7QBWC0ouzAFkKaR6tUApqVR1Scwzxbx2-vQ&s`,
    desc: 'Boleto VIP con servicio premium, wifi y comidas incluidas.',
    badge: 'BEST SELLER',
  },
  {
    id: 4,
    title: 'Agua Natural — 500ml',
    price: '1.50',
    originalPrice: null,
    category: 'store',
    image: `https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=500&fit=crop&q=80`,
    desc: 'Agua purificada embotellada, ideal para el viaje.',
    badge: null,
  },
  {
    id: 5,
    title: 'Boleto Autobús — Monterrey',
    price: '65.00',
    originalPrice: '90.00',
    category: 'transport',
    image: `https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=500&fit=crop&q=80`,
    desc: 'Oferta especial: viaje nocturno con descanso garantizado.',
    badge: 'HOT PROMO',
  },
  {
    id: 6,
    title: 'Papas Fritas — Bolsa Grande',
    price: '3.50',
    originalPrice: null,
    category: 'store',
    image: `https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=500&fit=crop&q=80`,
    desc: 'Papas fritas crujientes, sabor original. Perfectas para el camino.',
    badge: 'NEW',
  },
  {
    id: 7,
    title: 'Boleto Autobús — Puebla',
    price: '28.00',
    originalPrice: null,
    category: 'transport',
    image: `https://plus.unsplash.com/premium_photo-1661963542752-9a8a1d72fb28?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740`,
    desc: 'Viaje económico y directo a Puebla con horarios flexibles.',
    badge: null,
  },
  {
    id: 8,
    title: 'Refresco — Coca Cola 600ml',
    price: '2.50',
    originalPrice: '3.00',
    category: 'store',
    image: `https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=500&fit=crop&q=80`,
    desc: 'Refresco frío, disponible en varios sabores.',
    badge: 'HOT PROMO',
  },
  {
    id: 9,
    title: 'Boleto Autobús — Tijuana',
    price: '95.00',
    originalPrice: null,
    category: 'transport',
    image: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/12/37/b1/caption.jpg?w=1200&h=-1&s=1`,
    desc: 'Viaje de larga distancia con paradas estratégicas y servicio de baño.',
    badge: 'NEW',
  },
  {
    id: 10,
    title: 'Sandwich — Jamón y Queso',
    price: '4.50',
    originalPrice: null,
    category: 'store',
    image: `https://media.baamboozle.com/uploads/images/118730/1631564705_38146.jpeg`,
    desc: 'Sandwich fresco preparado diariamente con ingredientes de calidad.',
    badge: null,
  },
  {
    id: 11,
    title: 'Revista — Entretenimiento',
    price: '2.00',
    originalPrice: null,
    category: 'store',
    image: `https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=500&fit=crop&q=80`,
    desc: 'Revista con las últimas noticias, entretenimiento y crucigramas.',
    badge: null,
  },
  {
    id: 12,
    title: 'Boleto Autobús — Oaxaca',
    price: '55.00',
    originalPrice: '75.00',
    category: 'transport',
    image: `https://cdn.milenio.com/uploads/media/2023/10/28/gobernador-oaxaca-banderazo-inicio-etapa_0_42_1200_757.jpg`,
    desc: 'Ruta panorámica con vistas espectaculares. Incluye guía turístico.',
    badge: 'BEST SELLER',
  },
])
</script>

<style scoped>
.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.products-header h1 {
  margin: 0;
}

.count {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-secondary-2);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  align-items: stretch;
}

.card {
  display: flex;
  flex-direction: column;
  background: var(--color-text-primary);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
  position: relative;
  height: 100%;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.image-wrapper {
  position: relative;
  width: 100%;
  flex-shrink: 0;
  overflow: hidden;
  background: var(--color-primary-4);
  aspect-ratio: 1 / 1;
}

.media {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.media img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.card:hover .media img {
  transform: scale(1.05);
}

.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
  color: var(--color-text-primary);
}

.badge.new {
  background: var(--color-primary-2);
}

.badge.best-seller {
  background: var(--color-primary-1);
}

.badge.hot-promo {
  background: var(--color-primary);
}

.meta {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  flex: 1;
  min-height: 110px;
}

.title {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  line-height: 1.3;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 36px;
}

.description {
  font-size: 12px;
  color: var(--color-text-secondary-2);
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 32px;
  flex: 1;
}

.price-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  min-height: 24px;
}

.price {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.original-price {
  font-size: 14px;
  color: var(--color-text-secondary-3);
  text-decoration: line-through;
}

.add-to-cart {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 40px !important;
  height: 40px !important;
  min-width: 40px !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(16, 94, 68, 0.3);
}

.add-to-cart:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(16, 94, 68, 0.4);
}

.add-to-cart:active {
  transform: scale(0.98);
}

.add-to-cart svg {
  width: 18px;
  height: 18px;
  margin: 0;
}

@media (max-width: 1200px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
