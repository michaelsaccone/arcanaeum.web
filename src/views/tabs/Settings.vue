<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Impostazioni</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item-divider>
          <ion-label>Generali</ion-label>
        </ion-item-divider>
        <ion-item>
          <ion-label>Lingua</ion-label>
          <ion-select v-model="selectedLanguage" interface="popover">
            <ion-select-option value="italian">Italiano</ion-select-option>
            <ion-select-option value="english">English</ion-select-option>
            <!-- Aggiungi altre lingue se necessario -->
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Scegli il tema</ion-label>
          <ion-select v-model="selectedTheme" interface="popover">
            <ion-select-option value="light">Chiaro</ion-select-option>
            <ion-select-option value="dark">Scuro</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Notifiche</ion-label>
          <ion-toggle v-model="notificationsEnabled"></ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>Nascondi Libri 18+</ion-label>
          <ion-toggle v-model="hideAdultBooks"></ion-toggle>
        </ion-item>
      </ion-list>

      <ion-item-divider>
        <ion-label>Account</ion-label>
      </ion-item-divider>
      <ion-list>
        <ion-item>
          <ion-label>Nome Utente</ion-label>
          <ion-input v-model="username" placeholder="Inserisci il tuo nome utente"></ion-input>
        </ion-item>
        <ion-item>
          <ion-button expand="block" @click="logout" color="danger">Esci dall'account</ion-button>
        </ion-item>
        <ion-item>
          <ion-button expand="block" @click="resetSettings" color="warning">Reset Impostazioni</ion-button>
        </ion-item>
      </ion-list>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItemDivider, IonLabel, IonItem, IonInput, IonSelect, IonSelectOption, IonToggle, IonButton } from '@ionic/vue';
import { ref } from 'vue';

const username = ref<string>('');
const selectedLanguage = ref<string>('italian');
const selectedTheme = ref<string>('light');
const notificationsEnabled = ref<boolean>(true);
const hideAdultBooks = ref<boolean>(false);

function logout() {
  // Implementa la logica per effettuare il logout dall'applicazione
  console.log('Logout eseguito');
}

function resetSettings() {
  // Implementa la logica per ripristinare le impostazioni predefinite
  console.log('Impostazioni ripristinate');
}
</script>
