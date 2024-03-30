<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">{{ title }}</ion-title>
        <ion-button slot="end" @click="showGenres">Mostra Generi</ion-button>
        <ion-button @click="displayBookPreview = false; showGenre = false;" slot="start" v-if="displayBookPreview"
                    color="danger">
          <ion-icon :icon="closeCircle"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-searchbar
            :debounce="150"
            autocapitalize="off"
            @ionChange="searchBooks($event)"
            placeholder="esplora ..."
            type="text"
            id="search-input"
        />
      </ion-item>

      <card-component :items="books" :clickable="true" :set-display-book-preview="setDisplayBookPreview"
                      :push-book-to-preview="pushBookToPreview"/>

      <ion-grid style="text-align: center; margin-right: 30px">

        <ion-row>
          <ion-col v-for="genre in BookGenres" :key="genre" size="6" size-md="4" size-lg="3">
            <div class="wrapper ion-activatable ripple-parent rounded-rectangle"
                 :style="{ backgroundColor: getRandomColor() }" @click="router.replace('/genre/' + genre)">
              {{ genre }}
              <ion-ripple-effect></ion-ripple-effect>
            </div>
          </ion-col>

        </ion-row>
      </ion-grid>

      <ion-alert
          trigger="present-alert"
          header="Nessun Libro Trovato"
          :is-open="openAlert"
          @did-dismiss="openAlert = false"
      ></ion-alert>


    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonIcon,
  IonPage,
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonTitle,
  IonContent,
  IonItem,
  IonButton,
  IonRippleEffect,
  IonGrid,
  IonCol,
  IonRow
} from '@ionic/vue';
import {add, closeCircle} from "ionicons/icons";
import {inject, onMounted, reactive, Ref, ref} from 'vue';
import {OverlayEventDetail} from '@ionic/core/components';
import BookList from "@/components/BookList.vue";
import Book from "@/models/Book";
import bookScraper from "@/logic/bookScraper";
import LoggedUser from "@/models/LoggedUser";
import {addBookToShopList} from "@/logic/api.books";
import CardComponent from "@/components/CardComponent.vue";
import router from "@/router";

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
  displayBookPreview.value = false;
  showGenre.value = false;
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

async function searchBooks(event: any) {
  const query = event.target.value;
  console.log("Inizio ricerca ... " + query);
  openPopover.value = true;
  books.value = await bookScraperObject.findBooksByQuery(query);
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

const BookGenresArray = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Fantasy',
  'Science Fiction',
  'Romance',
  'Horror',
  'Thriller',
  'Historical',
  'Biography',
  'Autobiography',
  'Self-Help',
  'Cookbook',
  'Travel',
  'Poetry',
  'Graphic Novel',
  'Art',
  'History',
  'Science',
  'Technology',
  'Medicine',
  'Law',
  'Education',
  'Psychology',
  'Business',
  'Philosophy',
  'Economics',
  'Sociology',
  'Mathematics',
  'Engineering',
  'Religion',
  'Music',
  'Film',
  'Theatre',
  'Dance',
];

const BookGenres = BookGenresArray.slice().sort();

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
const openAlert = ref(false)

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
