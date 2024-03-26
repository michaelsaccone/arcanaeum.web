<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Liste</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <book-list :books="books" />

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
import { IonThumbnail, IonIcon, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonReorder, IonReorderGroup, IonImg, IonModal, IonFab, IonButton, IonButtons, IonInput, IonFabButton } from '@ionic/vue';
import {add} from "ionicons/icons";
import { ref } from 'vue';
import { OverlayEventDetail } from '@ionic/core/components';
import BookList from "@/components/BookList.vue";
import Book from "@/models/Book";

const books: Array<Book> = [
  {
    title: "Orlando Furioso",
    author: "Ludovico Arioso",
    publishYear: "1561",
    image: "https://m.media-amazon.com/images/I/71wKD46XqjL._AC_UF1000,1000_QL80_.jpg",
    isbn: "12313123",
    description: "YAP YAP YAP",
    genre: "romanzo, cavalleresco"
  },
  {
    title: "Orlando Yapper",
    author: "Ludovico Arioso",
    publishYear: "1561",
    image: "https://m.media-amazon.com/images/I/71wKD46XqjL._AC_UF1000,1000_QL80_.jpg",
    isbn: "12313123",
    description: "YAP YAP YAP",
    genre: "romanzo, cavalleresco"
  },
  {
    title: "Orlando Bortolox",
    author: "Ludovico Arioso",
    publishYear: "1561",
    image: "https://m.media-amazon.com/images/I/71wKD46XqjL._AC_UF1000,1000_QL80_.jpg",
    isbn: "12313123",
    description: "YAP YAP YAP",
    genre: "romanzo, cavalleresco"
  }
]

const modal = ref();
const input = ref();
const message = ref('This modal example uses triggers to automatically open a modal when the button is clicked.');

const addBookText = ref("ciao ");

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

</script>
