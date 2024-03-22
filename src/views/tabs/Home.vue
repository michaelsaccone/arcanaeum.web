<template>
  
  <ion-page>
    
    <ion-header>
      
      <ion-toolbar>
       
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
      <ion-button  @click="gestoreFamiglia" id="o pen-modal" expand="block" href="/families">Famiglia</ion-button>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';

function gestoreFamiglia() {
  console.log('Impostazioni famigliglia:')
}
</script>
