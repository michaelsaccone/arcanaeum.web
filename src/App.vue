<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import {onMounted} from "vue";
import storage from './plugins/storage';

onMounted(async () => {
  checkAppMode()
})

async function checkAppMode() {
  const darkModeActivated = await storage.get('darkModeActivated');
  if (darkModeActivated === 'true') {
    document.body.classList.add('dark');
  }
  else {
    document.body.classList.remove('dark');
  }
}
</script>
