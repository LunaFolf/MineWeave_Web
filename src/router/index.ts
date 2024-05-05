import { createRouter, createWebHistory } from 'vue-router'
import { useAuthenticationStore } from '@/stores/authentication'
import {useWebsocketStore} from "@/stores/websocket";

let authStore
let webStore

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'terms',
      component: () => import('../views/TermsView.vue')
    },
    {
      path: '/modrinth',
      name: 'modrinth',
      component: () => import('../views/ModrinthView.vue')
    },
    {
      path: '/discord',
      name: 'discord',
      component: () => import('../views/discord/OAuthView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard/DashboardView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/settings/SettingsView.vue')
    },
    {
      path: '/plugins',
      name: 'plugins',
      component: () => import('../views/plugins/PluginsView.vue')
    },
    {
      path: '/mods',
      name: 'mods',
      component: () => import('../views/mods/ModsView.vue')
    },
  ]
})

router.beforeEach((to, from) => {
  if (!authStore) authStore = useAuthenticationStore()
  if (!webStore) webStore = useWebsocketStore()

  console.log('a')

  if (!authStore.userAgreedToTerms && to.name !== 'terms') {

    console.log('a.1')
    return { name: 'terms', query: { returnTo: to.path } }
  }

  console.log('b')

  if (authStore.userAgreedToTerms && !webStore.isAuthed && to.name !== 'discord') {

    console.log('b.2')
    return { name: 'discord', query: { returnTo: to.path } }
  }

  console.log('c')

  if (authStore.userAgreedToTerms && webStore.isAuthed && ['terms', 'discord'].includes(to.name)) {

    console.log('c.3')
    const returnAddr = [to.query.returnTo, from.name, 'dashboard'].filter(a => !['terms', 'discord'].includes(a) && a)
    return { name: returnAddr[0] }
  }

  console.log('d')
})

export default router
