import { createRouter, createWebHistory } from 'vue-router'
import NewAddressView from '@/pages/NewAddressView.vue'
import AllAddress from '@/pages/AllAddressView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'newAddress',
      component: NewAddressView,
    },
    {
      path: '/all-address',
      name: 'allAddress',
      component: AllAddress,
    },
  ],
})

export default router
