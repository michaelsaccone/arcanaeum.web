import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import SignUp from "@/views/SignUpPage.vue";
import CreateJoinFamily from "@/views/SetFamilyPage.vue";
import IntroSlides from "@/views/IntroPage.vue";
import RecommendationPage from "@/views/tabs/RecommendationTab.vue";
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
        component: () => import('@/views/tabs/HomeTab.vue')
      },
      {
        path: 'summary',
        component: () => import('@/views/tabs/SummaryTab.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/tabs/SettingsTab.vue')
      },
      {
        path: "/intro",
        component: IntroSlides
      },
      {
        path: 'swipe',
        component: RecommendationPage
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
