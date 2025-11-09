import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/login/Login.vue'),
    },
    {
      path: '/admin',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue'),
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('@/views/products/ListProducts.vue'),
        },
        {
          path: 'rules',
          name: 'rulesQuery',
          component: () => import('@/views/rules/RulesQuery.vue'),
        },
        {
          path: 'rules/add',
          name: 'rulesAdd',
          component: () => import('@/views/rules/RulesAdd.vue'),
        },
        {
          path: 'rules/:id',
          name: 'rulesEdit',
          component: () => import('@/views/rules/RulesAdd.vue'),
        },
      ],
    },
  ],
})

export default router
