import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import SignUp from "@/views/SignUp.vue";
import CreateJoinFamily from "@/views/CreateJoinFamily.vue";
import IntroSlides from "@/views/IntroSlides.vue";
import ReccomendationPage from '@/views/ReccomendationPage.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/signup',
    component: SignUp
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/tabs/Home.vue')
      },
      {
        path: 'summary',
        component: () => import('@/views/tabs/Liste.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/tabs/Settings.vue')
      },
      {
        path: 'accountPreferences',
        component: () => import('@/views/tabs/AccountPreferences.vue')
      },
      {
        path: "/intro",
        component: IntroSlides
      },
      {
        path: 'swipe',
        component: ReccomendationPage
      },
      {
        path: 'families',
        component: CreateJoinFamily
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
