<script setup lang="ts">
import {IonPage, IonContent, IonHeader, IonTitle, IonToolbar} from "@ionic/vue";
import {onMounted, ref, Ref} from "vue";
import Book from "@/models/Book";
import BookScraper from "@/logic/bookScraper";
import { useRoute } from "vue-router";
import BookList from "@/components/BookList.vue";

const route = useRoute();
const bookScraper = new BookScraper();

const books: Ref<Array<Book>> = ref([])

const genre: string = route.params.genre;

onMounted(async () => {
  books.value = await bookScraper.findBooksByGenre(genre!);
  console.log(books.value)
})

// const searchBook = async (event: any) => {
//   const query = event.target.value;
//   // clickedGenre.value = genre;
//   let foundBooks: Array<Book> = [];
//   let numAttempts = 0;
//
//   while (foundBooks.length < 10 && numAttempts < 10) {
//     foundBooks = await searchBooks(clickedGenre.value);
//     console.log("GENERE LIBRO CLICKED: ", clickedGenre.value);
//     console.log("FOUND BOOKS: ", foundBooks);
//     numAttempts++;
//   }
//
//   // Filtra i libri trovati per il genere cliccato
//   const filteredBooks = foundBooks.filter(book => {
//     // Controlla se il genere è incluso nei generi del libro
//     const genreIncluded = book.genres.includes(clickedGenre.value);
//     // Controlla se il genere è incluso nel titolo del libro
//     const genreInTitle = book.title.toLowerCase().includes(genre.toLowerCase());
//     return genreIncluded || genreInTitle; // Include il libro se il genere è incluso nei generi del libro o nel titolo del libro
//   });
//
//   // Ordina l'array filtrato in ordine alfabetico per titolo
//   filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
//
//   if (filteredBooks.length === 0) {
//     console.log("NESSUN LIBRO TROVATO");
//     displayBookPreview.value = false;
//     openAlert.value = true;
//     return;
//   }
//
//   // Aggiungi libri dall'array non filtrato se il numero di libri filtrati è inferiore a 10
//   const additionalBooks = foundBooks.filter(book => !filteredBooks.includes(book));
//   const numAdditionalBooks = 10 - filteredBooks.length;
//   const moreBooks = additionalBooks.slice(0, numAdditionalBooks);
//
//   const finalBooks = filteredBooks.concat(moreBooks);
//
//   booksPreviewTemp.value = finalBooks;
//
//   // Imposta displayBookPreview a true per visualizzare CardComponent
//   displayBookPreview.value = true;
// };
</script>

<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-title class="ion-text-center">{{ route.params.genre }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <book-list :books="books" />
  </ion-content>
</ion-page>
</template>

<style scoped>

</style>