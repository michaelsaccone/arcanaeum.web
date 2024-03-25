<template>

    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu Content</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-menu-toggle>
          <ion-button>Click to close the menu</ion-button>
        </ion-menu-toggle>
      </ion-content>
    </ion-menu>

  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <div style="align-content: center">
          <ion-title style="text-align: left">ARCANAEUM personale</ion-title>
          <ion-icon :icon="bookSharp()"></ion-icon>
        </div>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

      <ion-list>
        <ion-card v-for="(item, index) in items" :key="index">
          <ion-card-header>
            <ion-card-title>Card Title {{ index + 1 }}</ion-card-title>
            <ion-card-subtitle>Card Subtitle {{ index + 1 }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            Here's a small text description for the card content. Nothing more, nothing less.
          </ion-card-content>
          <ion-menu-toggle>
            <ion-button fill="clear"><ion-icon aria-hidden="true" :icon="bookmarkOutline()" /></ion-button>
          </ion-menu-toggle>
        </ion-card>
      </ion-list>

      <div style="height: 20px;"></div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonSearchbar, IonHeader, IonTitle, IonToolbar, IonMenu, IonMenuToggle } from '@ionic/vue';
import { defineComponent, reactive } from 'vue';
import {bookmarkOutline, bookOutline, bookSharp, personOutline} from "ionicons/icons";

export default defineComponent({
  methods: {
    bookmarkOutline() {
      return bookmarkOutline
    },
    bookSharp() {
      return bookSharp
    },
    bookOutline() {
      return bookOutline
    },
    personOutline() {
      return personOutline
    },
  },
  components: {
    IonPage,
    IonMenu,
    IonMenuToggle,
    IonContent,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonSearchbar,
    IonHeader,
    IonTitle,
    IonToolbar
  },
  setup() {
    const items = reactive([]);

    for (let i = 1; i < 11; i++) {
      items.push(`Item ${i}`);
    }

    return { items };
  },
});
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
</style>
