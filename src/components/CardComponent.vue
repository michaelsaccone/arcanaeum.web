<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg } from "@ionic/vue";
import Book from "@/models/Book";
import { addBookToShopList } from "@/logic/api.books";

const props = defineProps({
  items: Array<Book>,
  clickable: Boolean,
  setDisplayBookPreview: Function,
  pushBookToPreview: Function,
});

const handleClick = (book: Book) => {
  if (!props.clickable) return;

  // Aggiungere libro alla lista da comprare
  addBookToShopList(book);

  // Aggiungere libro a booksPreview
  if (props.pushBookToPreview) {
    props.pushBookToPreview(book);
  }
  console.log("AGGIUNTO LIBRO", book)

  // Verifica se props.setDisplayBookPreview è definito prima di chiamarlo
  if (props.setDisplayBookPreview) {
    props.setDisplayBookPreview(false);
  }
}
</script>

<template>
  <ion-card v-for="(item, index) in items" :key="index" @click="handleClick(item)">
    <ion-card-header class="ion-text-center">
      <ion-card-subtitle>{{ item.author }}</ion-card-subtitle>
      <ion-card-title>{{ item.title }}</ion-card-title>
      <ion-card-subtitle>{{ item.publishYear }}</ion-card-subtitle>
      <ion-img :src="item.image" style="max-width: 65%;" />
    </ion-card-header>
  </ion-card>
</template>

<style scoped>

</style>
