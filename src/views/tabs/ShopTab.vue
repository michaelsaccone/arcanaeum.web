<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-button slot="end" @click="showGenres">Mostra Generi</ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" v-if="!displayBookPreview">

        <ion-content class="ion-padding">
          <ion-item>
            <ion-input
                id="search-input"
                label="Titolo, Autore ..."
                label-placement="stacked"
                ref="input"
                type="text"
                placeholder="Scrivi ..."
                v-model="addBookText"
                @change="openGenre(addBookText)"
            ></ion-input>
          </ion-item>

          <book-list v-if="!showGenre" :books="booksPreview" reorder/>

          <ion-grid style="text-align: center; margin-right: 30px" v-else>
            <ion-row>
              <ion-col v-for="genre in BookGenres" :key="genre" size="6" size-md="4" size-lg="3">
                <div class="wrapper ion-activatable ripple-parent rounded-rectangle" :style="{ backgroundColor: getRandomColor() }" @click="openGenre(genre)">
                  {{ genre }}
                  <ion-ripple-effect></ion-ripple-effect>
                </div>
              </ion-col>

            </ion-row>
          </ion-grid>
        </ion-content>

    </ion-content>
    <ion-content v-else>
      <card-component :items="booksPreviewTemp" :clickable="true" :set-display-book-preview="setDisplayBookPreview" :push-book-to-preview="pushBookToPreview" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonIcon,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonModal,
  IonFab,
  IonButton,
  IonButtons,
  IonInput,
  IonFabButton,
  IonRippleEffect,
  IonGrid,
  IonCol,
  IonRow,
  IonPopover
} from '@ionic/vue';
import {add} from "ionicons/icons";
import {inject, onMounted, reactive, Ref, ref} from 'vue';
import { OverlayEventDetail } from '@ionic/core/components';
import BookList from "@/components/BookList.vue";
import Book from "@/models/Book";
import bookScraper from "@/logic/bookScraper";
import LoggedUser from "@/models/LoggedUser";
import {addBookToShopList} from "@/logic/api.books";
import CardComponent from "@/components/CardComponent.vue";

const storage = <Storage>inject('store');

// Codice per ottenere oggetto dallo storage
onMounted(async () => {
  loggedUser.value = await storage.get('user')
})
const loggedUser: Ref<LoggedUser | null> = ref(null);

const bookScraperObject = new bookScraper();

const title = ref('Esplora');

const openPopover = ref(false);

const modal = ref();
const input = ref();
const message = ref('This modal example uses triggers to automatically open a modal when the button is clicked.');
const showGenre = ref(false);
const displayBookPreview = ref(false);
const books: Ref<Array<Book>> = ref([])
const booksPreview: Ref<Array<Book>> = ref([])
const booksPreviewTemp: Ref<Array<Book>> = ref([])
const setDisplayBookPreview = (value: boolean) => {
  displayBookPreview.value = value;
}

const pushBookToPreview = (book: Book) => {
  booksPreview.value.push(book);
}

const state = reactive({
  displayBookPreview: false,
});






const addBookText = ref("");

const dismiss = () => {
  modal.value.$el.dismiss();
};


function printCiao() {
  console.log(addBookText.value);
}

function showGenres() {
  showGenre.value = !showGenre.value;
}

function onCloseModal() {
  console.log("CHIUSO MODAL")
  addBookText.value = "";
  books.value = [];
  openPopover.value = false;
}

async function searchBooks(input: string) {
  console.log("VALORE INPUT \n" + addBookText.value);
  openPopover.value = true;
  books.value = await bookScraperObject.cercaLibriFinale(input);
  console.log(books.value);
  return books.value
}

const cancel = () => modal.value.$el.dismiss(null, 'cancel');

const confirm = () => {
  const name = addBookText.value;
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


const openGenre = async (genre: string) => {
  clickedGenre.value = genre;
  const foundBooks: Array<Book> = await searchBooks(clickedGenre.value);
  console.log("GENERE LIBRO CLICKED: ", clickedGenre.value);
  console.log("FOUND BOOKS: ", foundBooks);

  // Aggiungi i libri trovati a booksPreview
  // foundBooks.forEach((book: Book) => {
  //   if (book.genres.includes(genre)) {
  //     booksPreviewTemp.value.push(book);
  //   }
  // });
  if (foundBooks.length === 0) {
    console.log("NESSUN LIBRO TROVATO");
    displayBookPreview.value = false;
    return;
  }
  booksPreviewTemp.value = foundBooks;

  // Imposta displayBookPreview a true per visualizzare CardComponent
  displayBookPreview.value = true;
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
