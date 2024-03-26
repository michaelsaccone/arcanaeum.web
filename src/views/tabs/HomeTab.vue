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
        <ion-searchbar v-model="searchTerm" @input="updateFilteredItems"></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-card v-for="(item, index) in filteredItems" :key="index">
          <ion-card-header>
            <ion-card-title>{{ item.title }}</ion-card-title>
            <ion-card-subtitle>{{ item.year }}</ion-card-subtitle>
            <ion-img :src="item.coverImage" style="max-width: 100%;"></ion-img>
          </ion-card-header>

          <ion-card-content :style="{ maxHeight: item.showMore ? 'none' : '50px', overflow: item.showMore ? 'none' : 'hidden', transition: 'max-height 0.3s' }">
            <template v-if="!item.showMore">
              {{ item.shortDescription }}
            </template>
            <template v-else>
              {{ item.longDescription }}
            </template>
          </ion-card-content>

          <ion-button fill="clear" @click="toggleDescription(index)">
            {{ item.showMore ? 'Nascondi libro' : 'Mostra libro' }}
          </ion-button>
        </ion-card>
      </ion-list>
      <div style="height: 20px;"></div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonSearchbar, IonHeader, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent, reactive, computed } from 'vue';
import { bookSharp } from "ionicons/icons";

interface Item {
  title: string;
  year: number;
  shortDescription: string;
  longDescription: string;
  showMore: boolean;
  coverImage: string;
}

export default defineComponent({
  methods: {
    bookSharp() {
      return bookSharp;
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
    const items = reactive<Item[]>([
      {
        title: 'Title 1',
        year: 2022,
        shortDescription: 'Short description for item 1',
        longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in turpis velit. Praesent vitae leo lorem. Phasellus aliquet vitae odio non maximus. Integer ac scelerisque nulla. Phasellus vel magna quis erat tincidunt consectetur. Duis rhoncus venenatis tempus. Curabitur viverra cursus sapien non ultricies. Pellentesque blandit ipsum enim.',
        showMore: false,
        coverImage: 'item-cover-1.jpg'
      },
      // Add more items as needed
      {
        title: 'Libro',
        year: 2022,
        shortDescription: 'Short description for item 1',
        longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in turpis velit. Praesent vitae leo lorem. Phasellus aliquet vitae odio non maximus. Integer ac scelerisque nulla. Phasellus vel magna quis erat tincidunt consectetur. Duis rhoncus venenatis tempus. Curabitur viverra cursus sapien non ultricies. Pellentesque blandit ipsum enim.',
        showMore: false,
        coverImage: 'item-cover-1.jpg'
      },
      {
        title: 'Orient',
        year: 2022,
        shortDescription: 'Short description for item 1',
        longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in turpis velit. Praesent vitae leo lorem. Phasellus aliquet vitae odio non maximus. Integer ac scelerisque nulla. Phasellus vel magna quis erat tincidunt consectetur. Duis rhoncus venenatis tempus. Curabitur viverra cursus sapien non ultricies. Pellentesque blandit ipsum enim.',
        showMore: false,
        coverImage: 'item-cover-1.jpg'
      },
      {
        title: 'Title 3',
        year: 2022,
        shortDescription: 'Short description for item 1',
        longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in turpis velit. Praesent vitae leo lorem. Phasellus aliquet vitae odio non maximus. Integer ac scelerisque nulla. Phasellus vel magna quis erat tincidunt consectetur. Duis rhoncus venenatis tempus. Curabitur viverra cursus sapien non ultricies. Pellentesque blandit ipsum enim.',
        showMore: false,
        coverImage: 'item-cover-1.jpg'
      },

    ]);

    const searchTerm = reactive<string>('');

    const filteredItems = computed(() => {
      if (!searchTerm) return items;
      return items.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    const toggleDescription = (index: number) => {
      items[index].showMore = !items[index].showMore;
    };

    const updateFilteredItems = (event: any) => {
      searchTerm.value = event.target.value;
    };

    return { searchTerm, filteredItems, toggleDescription, updateFilteredItems };
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
