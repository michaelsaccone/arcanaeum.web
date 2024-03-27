
<template>
  <ion-reorder-group :disabled="!reorder" @ionItemReorder="handleReorder($event)">
    <ion-item :key="b.isbn" v-for="b in books">
      <ion-button v-if="props.clickable" slot="end" @click="handleItemClick(b)" color="success">
        <ion-icon :icon="add"></ion-icon>
      </ion-button>
      <ion-thumbnail slot="start">
        <img :src="b.image" />
      </ion-thumbnail>
      <ion-label>
        <h3>{{ b.title }}</h3>
        <p>{{ b.author }}</p>
        <p>{{ b.publishYear }}</p>
      </ion-label>
      <ion-reorder slot="end"></ion-reorder>
    </ion-item>
  </ion-reorder-group>
</template>

<script setup lang="ts">

import {IonIcon, IonImg, IonItem, IonLabel, IonReorder, IonReorderGroup, IonThumbnail, IonButton} from "@ionic/vue";
import Book from "@/models/Book";
import {add} from "ionicons/icons";
import {inject, onMounted, ref, Ref} from "vue";
import LoggedUser from "@/models/LoggedUser";

const props = defineProps({
  books: Array<Book>,
  reorder: Boolean,
  clickable: Boolean
});

const storage = <Storage>inject('store');

// Codice per ottenere oggetto dallo storage
onMounted(async () => {
  loggedUser.value = await storage.get('user')
})
const loggedUser: Ref<LoggedUser | null> = ref(null);


const handleReorder = (event: CustomEvent) => {
  console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
  event.detail.complete();

};

const handleItemClick = (book: Book) => {
  if (!props.clickable) return;
  loggedUser.value?.books.push(book);
  console.log(loggedUser.value?.books);
  console.log("Clicked on book", book);
}

</script>

<style scoped>

</style>