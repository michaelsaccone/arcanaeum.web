<script setup lang="ts">

import {IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg} from "@ionic/vue";
import Book from "@/models/Book";

defineProps({
  items: Array<Book>
});

</script>

<template>
  <ion-card v-for="(item, index) in items" :key="index">
    <ion-card-header>
      <ion-card-subtitle>{{ item.author }}</ion-card-subtitle>
      <ion-card-title>{{ item.title }}</ion-card-title>
      <ion-card-subtitle>{{ item.publishYear }}</ion-card-subtitle>
      <ion-img :src="item.image" style="max-width: 80%;"></ion-img>
    </ion-card-header>
  </ion-card>
</template>

<style scoped>

</style>