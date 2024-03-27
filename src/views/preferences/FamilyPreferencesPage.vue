<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/settings"></ion-back-button>
        </ion-buttons>
        <ion-title>Gestisci Famiglia</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card color="light" class="ion-text-center">
        <ion-card-header>
          <ion-card-title>Codice Famiglia</ion-card-title>
        </ion-card-header>
        <ion-card-content class="ion-text-center">
          <qr-code :value="familyCode" background="#ffffff" level="H"></qr-code>
          <p style="color: skyblue; font-size: x-large;">{{ familyCode }}</p>
        </ion-card-content>
      </ion-card>

      <ion-list lines="full">
        <ion-item-divider color="primary">
          <ion-label><h2>Membri della Famiglia</h2></ion-label>
        </ion-item-divider>
        <ion-item v-for="(member, index) in familyMembers" :key="index" color="light">
          <ion-icon :icon="personOutline" slot="start"></ion-icon>
          <ion-label>{{ member.name }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <!--
    <ion-footer>
      <ion-toolbar>
        <ion-item color="light">
          <ion-label expand="block" @click="familylogout" color="danger" shape="round" size="default">Abbandona famiglia</ion-label>
          <ion-icon slot="end" :icon="exitOutlineIcon" class="red"></ion-icon>
        </ion-item>
      </ion-toolbar>
    </ion-footer>
    -->
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonItem, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItemDivider, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonFooter } from '@ionic/vue';
import { ref } from 'vue';
import { personOutline, exitOutline } from "ionicons/icons";
import router from "@/router";
import QrCode from 'qrcode.vue';

const familyMembers = ref([
  { name: 'Willy' },
  { name: 'Wonka' },
  { name: 'El turco' }
]);
const familyCode = ref(generateFamilyCode());
const exitOutlineIcon = exitOutline;

function generateFamilyCode() {
  // TODO: Aggiungere la logica per generare un codice univoco per la famiglia
  return '1R6F4G';
}

function familylogout() {
  // TODO: Aggiungere la logica per effettuare il logout dall'applicazione
  console.log('Logout eseguito');
  router.push('/');
}
</script>

<style scoped>
  ion-item {
    margin: 5px;
    border-radius: 10px;
  }

  .red {
    color: rgb(255, 64, 64);
  }
</style>