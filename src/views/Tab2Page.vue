<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Liste</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-reorder-group :disabled="false" @ionItemReorder="handleReorder($event)">
          <ion-item :key="i" v-for="i in items">
            <ion-thumbnail slot="start">
              <ion-icon style="width: 100%; height: 100%" :icon="bookSharp"></ion-icon>
            </ion-thumbnail>
            <ion-label>
              <h3>{{ i }}</h3>
              <p>The Beatles</p>
              <p>1969</p>
            </ion-label>
            <ion-reorder slot="end"></ion-reorder>
          </ion-item>
          <ion-item>
            <ion-label> Item 4 </ion-label>
            <ion-reorder slot="end"></ion-reorder>
          </ion-item>

          <ion-item>
            <ion-label> Item 5 </ion-label>
            <ion-reorder slot="end"></ion-reorder>
          </ion-item>
      </ion-reorder-group>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonThumbnail, IonIcon, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonReorder, IonReorderGroup } from '@ionic/vue';
import {bookSharp} from "ionicons/icons";
const items = [
  "Ciao",
  "ciao 2",
  "cherubini routing",
  "Carleschi"
];
const handleReorder = (event: CustomEvent) => {
  // The `from` and `to` properties contain the index of the item
  // when the drag started and ended, respectively
  console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

  // Finish the reorder and position the item in the DOM based on
  // where the gesture ended. This method can also be called directly
  // by the reorder group
  event.detail.complete();
};

</script>
