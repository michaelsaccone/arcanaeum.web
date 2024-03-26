<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Impostazioni</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list lines="full">
        <ion-item-divider color="primary">
          <ion-label><h2>Generali</h2></ion-label>
        </ion-item-divider>
        <ion-item href="/read-books" color="light">
          <ion-label>Libri letti</ion-label>
          <ion-icon slot="end" :icon="arrowForwardOutlineIcon"></ion-icon>
        </ion-item>
        <ion-item color="light">
          <ion-select v-model="selectedLanguage" interface="popover" label="Lingua">
            <ion-select-option value="italian">Italiano</ion-select-option>
            <ion-select-option value="english">English</ion-select-option>
            <!-- Aggiungere altre lingue se necessario -->
          </ion-select>
        </ion-item>
        <ion-item color="light">
          <ion-select v-model="selectedTheme" interface="popover" label="Scegli il tema">
            <ion-select-option value="dark">Scuro</ion-select-option>
            <ion-select-option value="light">Chiaro</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item color="light">
          <ion-toggle v-model="notificationsEnabled">Notifiche</ion-toggle>
        </ion-item>
        <ion-item color="light">
          <ion-toggle v-model="hideAdultBooks">Nascondi Libri 18+</ion-toggle>
        </ion-item>
      </ion-list>

      <ion-item-divider color="primary">
        <ion-label><h2>Account</h2></ion-label>
      </ion-item-divider>
      <ion-list lines="full">
        <ion-item color="light">
          <ion-input v-model="username" label="Nome Utente" labelPlacement="stacked" placeholder="Inserisci il tuo nome utente"></ion-input>
        </ion-item>
        <ion-item href="/account-preferencies" color="light">
          <ion-label>Cambia le mie preferenze</ion-label>
          <ion-icon slot="end" :icon="arrowForwardOutlineIcon"></ion-icon>
        </ion-item>
        <ion-item href="/family-settings" color="light">
          <ion-label>Gestisci famiglia</ion-label>
          <ion-icon slot="end" :icon="arrowForwardOutlineIcon"></ion-icon>
        </ion-item>
        <ion-item color="light">
          <ion-label expand="block" @click="logout" color="danger" shape="round" size="default">Esci dall'account</ion-label>
          <ion-icon slot="end" :icon="exitOutlineIcon" class="red"></ion-icon>
        </ion-item>
        <ion-item color="light">
          <ion-label expand="block" @click="resetSettings" color="warning" shape="round" size="default">Reset Impostazioni</ion-label>
          <ion-icon slot="end" :icon="settingsOutlineIcon" class="yellow"></ion-icon>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItemDivider, IonLabel, IonItem, IonInput, IonSelect, IonSelectOption, IonToggle, IonButton, IonIcon } from '@ionic/vue';
import { ref } from 'vue';
import { arrowForwardOutline, exitOutline, settingsOutline } from 'ionicons/icons';
import router from "@/router";

const username = ref<string>('');
const selectedLanguage = ref<string>('italian');
const selectedTheme = ref<string>('dark');
const notificationsEnabled = ref<boolean>(true);
const hideAdultBooks = ref<boolean>(false);
const arrowForwardOutlineIcon = arrowForwardOutline;
const exitOutlineIcon = exitOutline;
const settingsOutlineIcon = settingsOutline;

function logout() {
  // TODO: Aggiungere la logica per effettuare il logout dall'applicazione
  console.log('Logout eseguito');
  router.push('/');
}

function resetSettings() {
  // TODO: Aggiungere la logica per ripristinare le impostazioni predefinite
  console.log('Impostazioni ripristinate');
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

 .yellow {
  color: rgb(255,204,0);
 }
</style>