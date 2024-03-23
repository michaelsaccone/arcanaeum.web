<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import SwipeCard from '@/components/SwipeCard.vue';

window.onload = () => {
  console.log('window loaded');
};
export default {
  name: 'Recommendation',
  components: {
    Swiper,
    SwiperSlide,
    SwipeCard
  },
  data() {
    return {
      items: [
        { image: 'https://m.media-amazon.com/images/I/51hpvxtvT4L._AC_UF1000,1000_QL80_.jpg' },
        { image: 'https://romis2016.files.wordpress.com/2020/03/boccaccio2.jpg' },
        { image: 'https://upload.wikimedia.org/wikipedia/commons/9/93/LE_ULTIME_LETTERE_DI_JACOPO_ORTIS_1929.jpg' }
        // Aggiungi altre carte qui
      ],
      swiperOptions: {
        // Opzioni Swiper
        // Esempio: { direction: 'horizontal', loop: true }
      },
      likedBooks: []
    };
  },
  methods: {
    onSwipe(index) {
      // Rimuovi la carta swipata
      this.items.splice(index, 1);
    },
    onRemove(index) {
      // Rimuovi la carta dalla vista
      this.items.splice(index, 1);
    }
  }
};
</script>


<template>
  <ion-page>
    <ion-header  style="background-color: #2a2a2a">
      <ion-toolbar>
        <ion-title>Swipe Cards</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="(item, index) in items" :key="index">
          <SwipeCard :image="item.image" @swiped="onSwipe(index)" @remove="onRemove(index)" />
        </swiper-slide>
      </swiper>
      <ion-item v-if="!items.length" class="message">
        <ion-label>Libri finiti per oggi</ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>


<style scoped>
.message {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
