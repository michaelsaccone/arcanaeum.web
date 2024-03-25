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

          <ion-card-content :style="{ maxHeight: item.showMore ? 'none' : '50px', overflow: item.showMore ? 'none' : 'hidden', transition: 'max-height 0.3s' }">
            <template v-if="!item.showMore">
              Here's a small text description for the card content. Nothing more, nothing less.
            </template>
            <template v-else>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus efficitur metus ac accumsan.
              Vestibulum quis ex nec mi eleifend elementum. In hac habitasse platea dictumst. Duis tincidunt
              lobortis augue. Sed nec justo eu leo ultricies bibendum. Mauris sit amet dolor velit. Nullam
              ultricies nunc id nulla feugiat, ut lacinia ex malesuada.
            </template>
          </ion-card-content>

          <ion-button fill="clear" @click="toggleDescription(index)">{{ item.showMore ? 'Nascondi libro' : 'Mostra libro' }}</ion-button>
        </ion-card>
      </ion-list>
      <div style="height: 20px;"></div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonSearchbar, IonHeader, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent, reactive } from 'vue';
import { bookSharp } from "ionicons/icons";

interface Item {
  title: string;
  showMore: boolean;
}

export default defineComponent({
  methods: {
    bookSharp() {
      return bookSharp
    }
  },
  components: {
    IonPage,
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
    const items = reactive<Item[]>([]);

    for (let i = 1; i < 11; i++) {
      items.push({ title: `Item ${i}`, showMore: false });
    }

    const toggleDescription = (index: number) => {
      items[index].showMore = !items[index].showMore;
    };

    return { items, toggleDescription };
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

ion-card-content {
  transition: max-height 0.3s ease;
}
</style>
