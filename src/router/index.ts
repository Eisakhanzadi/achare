import { createRouter, createWebHistory } from 'vue-router'
import NewAddressView from '../views/NewAddressView.vue'
import AllAddress from '@/views/AllAddressView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/new-Address',
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
