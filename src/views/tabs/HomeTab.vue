<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="custom-toolbar">
        <ion-item>
          <ion-searchbar
              autocapitalize="false"
              id="search-input"
              placeholder="Cerca libri da aggiungere..."
              v-model="addBookText"
              @ionChange="searchBooks"
          ></ion-searchbar>
        </ion-item>
      </ion-toolbar>
    </ion-header>
    <ion-content>

<!--      <book-list :books="loggedUser?.books" reorder/>-->

      <ion-popover trigger="search-input" trigger-action="context-menu"  :is-open="openPopover" alignment="start" side="bottom" size="cover" @willDismiss="dismiss()">
        <book-list :books="books" clickable></book-list>
      </ion-popover>

      <ion-list>
        <!-- Utilizza v-for per ciclare sugli items e visualizzare le card -->
        <ion-card v-for="(item, index) in items" :key="index">
          <ion-card-header>
            <ion-card-subtitle>{{ item.author }}</ion-card-subtitle>
            <ion-card-title>{{ item.title }}</ion-card-title>
            <ion-card-subtitle>{{ item.year }}</ion-card-subtitle>
            <ion-img :src="item.coverImage" style="max-width: 80%;"></ion-img>
          </ion-card-header>
          <ion-card-content :style="{ maxHeight: item.showMore ? 'none' : '50px', overflow: item.showMore ? 'none' : 'hidden', transition: 'max-height 0.3s' }">
            <template v-if="!item.showMore">
              {{ item.shortDescription }}
            </template>
            <template v-else>
              {{ item.longDescription }}
            </template>
          </ion-card-content>
          <ion-button fill="clear" @click="toggleDescription(index)">{{ item.showMore ? 'Nascondi libro' : 'Mostra libro' }}</ion-button>
        </ion-card>
      </ion-list>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button>
          <ion-icon :icon="chevronUpCircle"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button id="open-modal-manual">
            <ion-icon :icon="bookOutline"></ion-icon>
          </ion-fab-button>
          <ion-fab-button id="open-barcode">
            <ion-icon :icon="barcode"></ion-icon>
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>

      <ion-modal ref="modal" show-backdrop trigger="open-modal-manual" @willDismiss="onWillDismiss">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="cancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Welcome</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="confirm()" :disabled="!areFieldsFilled()">Confirm</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-input
                ref="input"
                type="text"
                label="Title"
                label-placement="floating"
                placeholder="Scrivi ..."
                v-model="addBookTitle"
            ></ion-input>
          </ion-item>
          <br>
          <ion-item>
            <ion-input
                ref="input"
                type="text"
                label="Autore"
                label-placement="floating"
                placeholder="Scrivi ..."
                v-model="addBookAuthor"
            ></ion-input>
          </ion-item>
          <br>
          <ion-item>
            <ion-input
                ref="input"
                type="date"
                label="Anno"
                label-placement="floating"
                placeholder="Scrivi ..."
                pattern="[0-9]*"
                v-model="addBookYear"
            ></ion-input>
          </ion-item>
          <br>
          <ion-item>
            <ion-input
                ref="input"
                type="text"
                label="Descrizione personale del libro"
                label-placement="floating"
                placeholder="Scrivi ..."
                v-model="addBookDescription"
            ></ion-input>
          </ion-item>
          <br>

              <ion-button fill="clear">
                Inserisci la copertina
              </ion-button>

        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonSearchbar} from "@ionic/vue";
import {
  IonPopover,
  IonPage,
  IonContent,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonInput, IonItem, IonButtons, IonModal, IonFab, IonFabList, IonFabButton, IonIcon,
} from '@ionic/vue';
import {reactive, Ref, ref} from 'vue';
import {OverlayEventDetail} from "@ionic/core/components";
import {barcode, chevronUpCircle, bookOutline} from "ionicons/icons";
import Book from "@/models/Book";
import BookList from "@/components/BookList.vue";
import LoggedUser from "@/models/LoggedUser";
import bookScraper from "@/logic/bookScraper";
import { getUserFavouriteBooks } from "@/logic/api.books"; // Assicurati di importare la funzione corretta dal tuo modulo firebaseLogic



interface Item {
  title: string;
  year: number;
  author: string;
  shortDescription: string;
  longDescription: string;
  showMore: boolean;
  coverImage: string;
}
const items = reactive<Item[]>([]);

// Popola gli items con i libri da leggere dell'utente
async function populateItems() {
  const booksToRead = await getBooksToRead();
  items.splice(0, items.length, ...booksToRead.map(book => ({
    title: book.title,
    author: Array.isArray(book.author) ? book.author.join(', ') : book.author, // Verifica se book.author è un array prima di chiamare join()
    year: parseInt(book.publishYear), // Assicurati che l'anno sia un numero intero
    shortDescription: '', // Aggiungi qui la tua descrizione breve se necessario
    longDescription: '', // Aggiungi qui la tua descrizione lunga se necessario
    showMore: false,
    coverImage: book.image
  })));
}


// Chiamata alla funzione per popolare gli items all'avvio della pagina
window.onload = populateItems;



    const loggedUser: Ref<LoggedUser | null> = ref(null);
    const openPopover = ref(false);
    const modal = ref();
    const input = ref();
    const message = ref('This modal example uses triggers to automatically open a modal when the button is clicked.');

    const books: Ref<Array<Book>> = ref([])
    const addBookTitle = ref("");
    const addBookAuthor = ref("");
    const addBookYear = ref("");
    const addBookDescription = ref("");
    const addBookText = ref("");
    const bookScraperObject = new bookScraper();

    async function getBooksToRead() {
      return await getUserFavouriteBooks();
    }

    const dismiss = () => {
      modal.value.$el.dismiss();
    };
    const toggleDescription = (index: number) => {
      items[index].showMore = !items[index].showMore;
    };

    async function searchBooks() {
      console.log("VALORE INPUT \n" + addBookText.value);
      openPopover.value = true;
      books.value = await bookScraperObject.cercaLibriFinale(addBookText.value);
      console.log(books.value);
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
    const areFieldsFilled = () => {
      return addBookTitle.value.trim() !== "" &&
          addBookAuthor.value.trim() !== "" &&
          addBookYear.value.trim() !== "" &&
          addBookDescription.value.trim() !== "";
    };
</script>

<style>
svg {
  width: 20px;
  height: 20px;
  display: inline-block;
}

.infinite-scroll-content {
  text-align: center;
  padding: 20px 0;
}

ion-card-content {
  transition: max-height 0.3s ease;
}

ion-modal {
  --height: 50%;
  --border-radius: 16px;
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

ion-modal::part(backdrop) {
  background: rgba(209, 213, 219);
  opacity: 1;
}

ion-modal ion-toolbar {
  --background: rgb(14 116 144);
  --color: white;
}
.custom-toolbar {
  --min-height: 40px; /* Modifica l'altezza minima della toolbar */
}

.custom-title {
  font-size: 18px; /* Riduci la dimensione del font del titolo */
}
  * {
    font-family: Helvetica, Arial, sans-serif;
  }

</style>
