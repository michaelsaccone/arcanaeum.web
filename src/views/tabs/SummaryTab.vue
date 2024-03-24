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
              <ion-img src="/resources/libroBG.png" >
              </ion-img>
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

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button id="open-modal" @click="printCiao">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>


      <ion-modal ref="modal" show-backdrop trigger="open-modal" @willDismiss="onWillDismiss">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="cancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Welcome</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-input
                label="Titolo, Autore ..."
                label-placement="stacked"
                ref="input"
                type="text"
                placeholder="Scrivi ..."
                v-model="addBookText"
            ></ion-input>
          </ion-item>
        </ion-content>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonThumbnail, IonIcon, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonReorder, IonReorderGroup, IonImg, IonModal } from '@ionic/vue';
import {add} from "ionicons/icons";
import { ref } from 'vue';
import { OverlayEventDetail } from '@ionic/core/components';

const items = [
  "Ciao",
  "ciao 2",
  "cherubini routing",
  "Carleschi",
  "stringa"
];

const modal = ref();
const input = ref();
const message = ref('This modal example uses triggers to automatically open a modal when the button is clicked.');

const addBookText = ref("ciao ");

function printCiao() {
  console.log(addBookText.value);
}
const handleReorder = (event: CustomEvent) => {
  console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
  event.detail.complete();
};

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

</script>
