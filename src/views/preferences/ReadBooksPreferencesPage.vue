<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/tabs/settings"></ion-back-button>
          </ion-buttons>
          <ion-title>Libri letti</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding" :fullscreen="true">
        <ion-list>
          <ion-card v-for="(book, index) in readBooks" :key="index">
            <ion-item color="light">
              <ion-icon :icon="bookOutline" slot="start"></ion-icon>
              <ion-label>
                <h2>{{ book.title }}</h2>
                <p>{{ book.description }}</p>
              </ion-label>
              <ion-icon :icon="trashBinOutline" slot="end" @click="deleteBook(index)" class="delete-icon"></ion-icon>
            </ion-item>
          </ion-card>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonCard, IonItem, IonIcon, IonLabel, IonButtons, IonBackButton } from '@ionic/vue';
  import { bookOutline, trashBinOutline } from "ionicons/icons";
  import { ref } from 'vue';
  
  const readBooks = ref([
    { title: '1984', description: 'Romanzo distopico di George Orwell', icon: 'bookOutline' },
    { title: 'Il Signore degli Anelli', description: 'Trilogia fantasy di J.R.R. Tolkien', icon: 'bookOutline' },
    { title: 'Cronache del ghiaccio e del fuoco', description: 'Serie fantasy di George R.R. Martin', icon: 'bookOutline' },
    // Aggiungere altri libri qui...
  ]);
  
  const deleteBook = (index: number) => {
    readBooks.value.splice(index, 1);
  };
  </script>

<style scoped>
    .delete-icon {
    color: rgb(255, 64, 64);
    }
</style>
  