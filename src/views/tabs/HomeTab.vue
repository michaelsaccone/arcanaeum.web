<template>
  <ion-page>
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

    <ion-content>
      <ion-list>
        <ion-card v-for="(item, index) in items" :key="index">
          <ion-card-header>
            <ion-card-title>Card Title {{ index + 1 }}</ion-card-title>
            <ion-card-subtitle>Card Subtitle {{ index + 1 }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            Here's a small text description for the card content. Nothing more, nothing less.
          </ion-card-content>

          <ion-button fill="clear">Mostra libro</ion-button>
        </ion-card>
      </ion-list>
      <ion-infinite-scroll>
        <div class="infinite-scroll-content">
          <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              enable-background="new 0 0 100 100"
              xml:space="preserve"
          >
          <circle fill="none" stroke="#1b6dff" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48" />
            <line
                fill="none"
                stroke-linecap="round"
                stroke="#1b6dff"
                stroke-width="4"
                stroke-miterlimit="10"
                x1="50"
                y1="50"
                x2="85"
                y2="50.5"
            >
            <animateTransform
                attributeName="transform"
                dur="2s"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
            />
          </line>
            <line
                fill="none"
                stroke-linecap="round"
                stroke="#1b6dff"
                stroke-width="4"
                stroke-miterlimit="10"
                x1="50"
                y1="50"
                x2="49.5"
                y2="74"
            >
            <animateTransform
                attributeName="transform"
                dur="15s"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
            />
          </line>
        </svg>
        </div>
      </ion-infinite-scroll>
      <div style="height: 20px;"></div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonInfiniteScroll, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonSearchbar, IonHeader, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent, reactive } from 'vue';
import {bookOutline, bookSharp, personOutline} from "ionicons/icons";

export default defineComponent({
  methods: {
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
    IonContent,
    IonInfiniteScroll,
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
