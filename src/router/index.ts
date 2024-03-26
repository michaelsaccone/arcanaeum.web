import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import SetFamilyPage from "@/views/SetFamilyPage.vue";
import IntroSlides from "@/views/IntroPage.vue";
import AccountPreferencesPage from "@/views/preferences/AccountPreferencesPage.vue";
import FamilyPreferencesPage from '@/views/preferences/FamilyPreferencesPage.vue';
import ShopTab from "@/views/tabs/ShopTab.vue";
import ComingSoonPage from "@/views/ComingSoonPage.vue";
import ReadBooksPreferencesPage from '@/views/preferences/ReadBooksPreferencesPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home',
    // TODO: add beforeEnter. If not Logged push to login
  },
  {
    path: '/login',
    component: () => import('@/views/authentication/LoginPage.vue')
  },
  {
    path: "/intro",
    component: IntroSlides
  },
  {
    path: '/set-family',
    component: SetFamilyPage
  },
  {
    path: '/account-preferences',
    component: AccountPreferencesPage
  },
  {
    path: '/family-settings',
    component: FamilyPreferencesPage
  },
  {
    path: '/read-books',
    component: ReadBooksPreferencesPage
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
        path: 'shop',
        component: ShopTab
      },
      {
        path: 'swipe',
        component: ComingSoonPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
