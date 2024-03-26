<script setup lang="ts">

import {IonImg, IonItem, IonLabel, IonReorder, IonReorderGroup, IonThumbnail} from "@ionic/vue";
import Book from "@/models/Book";

defineProps({
  books: Array<Book>
});


const handleReorder = (event: CustomEvent) => {
  console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
  event.detail.complete();
};

</script>

<template>
  <ion-reorder-group :disabled="false" @ionItemReorder="handleReorder($event)">
    <ion-item :key="b.isbn" v-for="b in books">
      <ion-thumbnail slot="start">
        <ion-img :src="b.image" >
        </ion-img>
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

<style scoped>

</style>