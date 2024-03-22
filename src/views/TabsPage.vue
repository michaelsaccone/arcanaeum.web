<template>
 
  <ion-page>
    
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">

        

        <ion-tab-button tab="tab2" href="/tabs/summary">
          <ion-icon aria-hidden="true" :icon="bag" />
          <ion-label>Liste</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab1" href="/tabs/home">
          <ion-icon aria-hidden="true" :icon="home" />
          <ion-label>HOME</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/settings">
          <ion-icon aria-hidden="true" :icon="settings" />
          <ion-label>Preferenze</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonButton } from '@ionic/vue';
import { bag, home, settings } from 'ionicons/icons';
</script>
