<template>
  <ion-content>
    <ion-header class="ion-no-border">
      <ion-toolbar sticky>
        <ion-title>Toolbar</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-text>
      <h2>In Evidenza</h2>
    </ion-text>
    <ion-list>
      <ion-card v-for="(item, index) in items" :key="index">
        <ion-card-header>
          <ion-card-title>{{ item }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-avatar slot="start">
            <img :src="'https://picsum.photos/80/80?random=' + index" alt="avatar" />
          </ion-avatar>
          <ion-label>{{ item }}</ion-label>
        </ion-card-content>
        <ion-button fill="clear"><ion-icon aria-hidden="true" :icon="bookmarkOutline()" /></ion-button>
        <ion-button fill="clear"><ion-icon aria-hidden="true" :icon="closeOutline()" /></ion-button>
      </ion-card>
    </ion-list>
    <ion-infinite-scroll @ionInfinite="ionInfinite">
      <ion-infinite-scroll-content></ion-infinite-scroll-content>
    </ion-infinite-scroll>
  </ion-content>
</template>

<script lang="ts">
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonAvatar,
  IonImg,
  IonLabel,
  IonHeader,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  InfiniteScrollCustomEvent, IonIcon,
} from '@ionic/vue';
import { defineComponent, reactive } from 'vue';
import {bookmarkOutline, closeOutline} from 'ionicons/icons';

export default defineComponent({
  methods: {
    closeOutline() {
      return closeOutline
    },
    bookmarkOutline() {
      return bookmarkOutline
    },
  },
  components: {
    IonIcon,
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonList,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonAvatar,
    IonImg,
    IonLabel,
    IonHeader,
    IonSearchbar,
    IonTitle,
    IonToolbar,
  },
  setup() {
    const items = reactive([]);

    const generateItems = () => {
      const count = items.length + 1;
      for (let i = 0; i < 20; i++) {
        items.push(`Item ${count + i}`);
      }
    };

    const ionInfinite = (ev: InfiniteScrollCustomEvent) => {
      generateItems();
      setTimeout(() => ev.target.complete(), 500);
    };

    generateItems();

    return { ionInfinite, items };
  },
});
</script>

<style scoped>
ion-header {
  position: sticky;
  top: 0;
  z-index: 1000;
}
</style>
