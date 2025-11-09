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
      <div class="grid" id="products">
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
    price: product.price,
    badge: product.badge,
  }
  cartStore.addProductToCart(productData)
}

const products = ref([
  {
    id: 1,
    title: 'Silk Coat — Limited Edition',
    price: '120.00',
    originalPrice: null,
    category: 'clothing',
    image: `https://picsum.photos/seed/product1/400/500`,
    desc: 'Luxurious silk scarf with artistic prints and hand-rolled edges.',
    badge: 'NEW',
  },
  {
    id: 2,
    title: 'Swarovski Necklace — Rose Blush',
    price: '54.00',
    originalPrice: null,
    category: 'accessories',
    image: `https://picsum.photos/seed/product2/400/500`,
    desc: 'Elegant satin mini dress designed for evening occasions.',
    badge: null,
  },
  {
    id: 3,
    title: 'Cartier Necklace — Pearl Drop',
    price: '400.00',
    originalPrice: '600.00',
    category: 'accessories',
    image: `https://picsum.photos/seed/product3/400/500`,
    desc: 'Cartier Necklace',
    badge: 'BEST SELLER',
  },
  {
    id: 4,
    title: 'Lipstick — Crimson Velvet',
    price: '38.00',
    originalPrice: null,
    category: 'beauty',
    image: `https://picsum.photos/seed/product4/400/500`,
    desc: 'Richly pigmented lipstick with a smooth matte finish.',
    badge: null,
  },
  {
    id: 5,
    title: 'Valentino Dress — Noir',
    price: '450.00',
    originalPrice: '650.00',
    category: 'clothing',
    image: `https://picsum.photos/seed/product5/400/500`,
    desc: 'Timeless leather tote bag designed for everyday luxury.',
    badge: 'HOT PROMO',
  },
  {
    id: 6,
    title: 'Blush — Crimson Red',
    price: '35.00',
    originalPrice: null,
    category: 'beauty',
    image: `https://picsum.photos/seed/product6/400/500`,
    desc: 'Timeless leather tote bag designed for everyday luxury.',
    badge: 'NEW',
  },
  {
    id: 7,
    title: 'Gentle Monster — Glasses',
    price: '270.00',
    originalPrice: null,
    category: 'accessories',
    image: `https://picsum.photos/seed/product7/400/500`,
    desc: 'Timeless leather tote bag designed for everyday luxury.',
    badge: null,
  },
  {
    id: 8,
    title: 'JPG 2-Piece — Stripes',
    price: '490.00',
    originalPrice: '720.00',
    category: 'clothing',
    image: `https://picsum.photos/seed/product8/400/500`,
    desc: 'Timeless leather tote bag designed for everyday luxury.',
    badge: 'HOT PROMO',
  },
  {
    id: 9,
    title: 'Marni Polo Shirt — Striped',
    price: '200.00',
    originalPrice: null,
    category: 'clothing',
    image: `https://picsum.photos/seed/product9/400/500`,
    desc: 'Timeless leather tote bag designed for everyday luxury.',
    badge: 'NEW',
  },
  {
    id: 10,
    title: 'MAC Blush — Light Pink',
    price: '17.00',
    originalPrice: null,
    category: 'beauty',
    image: `https://picsum.photos/seed/product10/400/500`,
    desc: 'Timeless leather tote bag designed for everyday luxury.',
    badge: null,
  },
  {
    id: 11,
    title: 'NYX Foundation — Golden',
    price: '30.00',
    originalPrice: null,
    category: 'beauty',
    image: `https://picsum.photos/seed/product11/400/500`,
    desc: 'Timeless leather tote bag designed for everyday luxury.',
    badge: null,
  },
  {
    id: 12,
    title: 'Chanel Dress — Electric Red',
    price: '420.00',
    originalPrice: '580.00',
    category: 'clothing',
    image: `https://picsum.photos/seed/product12/400/500`,
    desc: 'Timeless leather tote bag designed for everyday luxury.',
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
