<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Preferiti, ciao {{ loggedUser?.name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <book-list :books="books" reorder/>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button id="open-modal" @click="printCiao">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>


      <ion-modal ref="modal" show-backdrop trigger="open-modal" @willDismiss="onWillDismiss">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="cancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Welcome</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-input
                label="Titolo, Autore ..."
                label-placement="stacked"
                ref="input"
                type="text"
                placeholder="Scrivi ..."
                v-model="addBookText"
            ></ion-input>
          </ion-item>
        </ion-content>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonRippleEffect, IonCol, IonRow, IonGrid, IonIcon, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonReorder, IonReorderGroup, IonImg, IonModal, IonFab, IonButton, IonButtons, IonInput, IonFabButton } from '@ionic/vue';
import {add} from "ionicons/icons";
import {Ref, ref} from 'vue';
import { OverlayEventDetail } from '@ionic/core/components';
import BookList from "@/components/BookList.vue";
import Book from "@/models/Book";
import LoggedUser from "@/models/LoggedUser";
import {onMounted} from "vue";
import storage from "@/plugins/storage";
import {getUserFavouriteBooks} from "@/logic/api.books";

// Codice per ottenere oggetto dallo storage
onMounted(async () => {
  loggedUser.value = await storage.get('user')
  console.log(loggedUser.value);
  books.value = await getUserFavouriteBooks();
})
const loggedUser: Ref<LoggedUser | null> = ref(null);

const books: Ref<Array<Book>> = ref<Array<Book>>([]);

const modal = ref();
const input = ref();
const message = ref('This modal example uses triggers to automatically open a modal when the button is clicked.');

const addBookText = ref("");

function printCiao() {
  console.log(addBookText.value);
}

const cancel = () => modal.value.$el.dismiss(null, 'cancel');

const confirm = () => {
  const name = input.value.$el.value;
  modal.value.$el.dismiss(name, 'confirm');
};

const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
  if (ev.detail.role === 'confirm') {
    message.value = `Hello, ${ev.detail.data}!`;
  }
};

const BookGenres = ['Fiction', 'Non-Fiction', 'Mystery', 'Fantasy', 'Science Fiction', 'Romance', 'Horror', 'Thriller', 'Historical', 'Biography', 'Autobiography',
  'Self-Help', 'Cookbook', 'Travel', 'Poetry', 'Graphic Novel', 'Comic', 'Manga', 'Art', 'Photography', 'Music', 'Film', 'Theatre', 'Dance',
  'Craft', 'Hobby', 'Sport', 'Fitness', 'Health', 'Wellness', 'Mindfulness', 'Spirituality', 'Religion', 'Philosophy', 'History', 'Politics', 'Economics', 'Sociology', 'Psychology',
  'Science', 'Mathematics', 'Technology', 'Engineering', 'Medicine', 'Law', 'Education', 'Language', 'Literature', 'Business', 'Finance', 'Marketing'];

const getRandomColor = () => {
  const minBrightness = 120; // minimo valore di luminosità
  const maxBrightness = 150; // massimo valore di luminosità
  const minColorValue = 0; // minimo valore di colore
  const maxColorValue = 150; // massimo valore di colore

  const randomColorValue = () => Math.floor(Math.random() * (maxColorValue - minColorValue + 1)) + minColorValue;
  const randomBrightness = () => Math.floor(Math.random() * (maxBrightness - minBrightness + 1)) + minBrightness;

  const red = randomColorValue();
  const green = randomColorValue();
  const blue = randomColorValue();
  const brightness = randomBrightness();

  return `rgb(${red},${green},${blue},${brightness}%)`;
};

const clickedGenre = ref('');

const displayGenre = (genre:string) => {
  clickedGenre.value = genre;
  console.log(clickedGenre.value);
};

</script>

<style scoped>

.ripple-parent {
  display: flex;
  position: relative;
  overflow: hidden;
}

.rounded-rectangle {
  margin: 20px;
  width: 95%;
  height: 125px;
  border-radius: 8px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
}

</style>
