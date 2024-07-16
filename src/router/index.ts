import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/account'
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/AccountView.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('@/views/PaymentView.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/login',
      name: 'logIn',
      component: () => import('@/views/auth/LogIn.vue')
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: () => import('@/views/auth/SignUp.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'unknown',
      redirect: '/404'
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  const authUserStore = useAuthStore()

  if (to.meta.authRequired && !authUserStore.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  if (from.name && to.name !== from.name) {
    window.scrollTo(0, 0)
  }
})
export default router
