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

const genre = ref(route.params.name);

onMounted(async () => {
  books.value = await bookScraper.findByGenre(genre.value!);
  console.log(books.value)
})
</script>

<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ genre }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <book-list :books="books" />
  </ion-content>
</ion-page>
</template>

<style scoped>

</style>