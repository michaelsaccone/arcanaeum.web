<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/tabs/settings"></ion-back-button>
          </ion-buttons>
          <ion-title>Modifica le mie preferenze</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-list>
          <ion-item color="light">
            <ion-toggle v-model="selectedFantasy">Fantasy</ion-toggle>
          </ion-item>
          <ion-item color="light">
            <ion-toggle v-model="selectedAdventure">Avventura</ion-toggle>
          </ion-item>
          <ion-item color="light">
            <ion-toggle v-model="selectedMystery">Mistero</ion-toggle>
          </ion-item>
          <ion-item color="light">
            <ion-toggle v-model="selectedRomantic">Romantico</ion-toggle>
          </ion-item>
          <ion-item color="light">
            <ion-toggle v-model="selectedThriller">Thriller</ion-toggle>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonToggle } from '@ionic/vue';
  import { ref } from 'vue';
  
  // Variabili per tenere traccia dello stato dei toggle per ciascuna categoria
  const selectedFantasy = ref<boolean>(false);
  const selectedAdventure = ref<boolean>(false);
  const selectedMystery = ref<boolean>(false);
  const selectedRomantic = ref<boolean>(false);
  const selectedThriller = ref<boolean>(false);
  </script>

  <style scoped>
    ion-item {
      margin: 5px;
      border-radius: 10px;
    }
  </style>
  