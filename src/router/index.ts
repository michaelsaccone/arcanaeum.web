import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import SetFamilyPage from "@/views/SetFamilyPage.vue";
import IntroSlides from "@/views/IntroPage.vue";
import AccountPreferencesPage from "@/views/preferences/AccountPreferencesPage.vue";
import FamilyPreferencesPage from '@/views/preferences/FamilyPreferencesPage.vue';
import ShopTab from "@/views/tabs/EsploraTab.vue";
import ComingSoonPage from "@/views/ComingSoonPage.vue";
import ReadBooksPreferencesPage from '@/views/preferences/ReadBooksPreferencesPage.vue';
import storage from "@/plugins/storage";
import EsploraTab from "@/views/tabs/esploraTab/EsploraTab.vue";
import GenreDetails from "@/views/GenreDetails.vue";

async function protectRoute(to: any, from: any, next: any) {
  const isAuthenticated = await storage.get('isLogged');
  if( !isAuthenticated ) next({ path: '/login' });
  else next();
}

async function skipIfLogged(to: any, from: any, next: any) {
  const isAuthenticated = await storage.get('isLogged');
  if( isAuthenticated ) next({ path: '/' });
  else next();
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home',
    beforeEnter: protectRoute
    // beforeEnter: protectRoute
    // TODO: add beforeEnter. If not Logged push to login
  },
  {
    path: '/login',
    component: () => import('@/views/authentication/LoginPage.vue'),
    beforeEnter: skipIfLogged
  },
  {
    path: "/intro",
    component: IntroSlides,
    beforeEnter: skipIfLogged
  },
  {
    path: '/set-family',
    component: SetFamilyPage,
    beforeEnter: skipIfLogged
  },
  {
    path: '/account-preferences',
    component: AccountPreferencesPage,
    beforeEnter: protectRoute
  },
  {
    path: '/family-settings',
    component: FamilyPreferencesPage,
    beforeEnter: protectRoute
  },
  {
    path: '/read-books',
    component: ReadBooksPreferencesPage,
    beforeEnter: protectRoute
  },
  {
    path: '/genre/:name',
    component: GenreDetails,
    props: true,
    beforeEnter: protectRoute
  },
  {
    path: '/tabs/',
    component: TabsPage,
    beforeEnter: protectRoute,
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
        path: 'favourites',
        component: () => import('@/views/tabs/FavouriteTab.vue')
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
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: '/tabs/home',
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
