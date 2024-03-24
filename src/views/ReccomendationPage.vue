<template>
  <vue-scroll-snap class="scroll-snap-container">
    <div class="item" v-for="(book, index) in books" :key="book.id">
      <img :src="book.image" class="book-image" alt="Book cover" />
    </div>
  </vue-scroll-snap>
</template>

<script>
import VueScrollSnap from "vue-scroll-snap";
import { ref } from 'vue';

export default {
  components: { VueScrollSnap },
  setup() {
    const books = ref([
      { id: 1, image: 'https://m.media-amazon.com/images/I/51hpvxtvT4L._AC_UF1000,1000_QL80_.jpg' },
      { id: 2, image: 'https://romis2016.files.wordpress.com/2020/03/boccaccio2.jpg' },
      { id: 3, image: 'https://upload.wikimedia.org/wikipedia/commons/9/93/LE_ULTIME_LETTERE_DI_JACOPO_ORTIS_1929.jpg' },
      { id: 4, image: 'https://assets.brightspot.abebooks.a2z.com/dims4/default/0d36bed/2147483647/strip/true/crop/218x330+0+0/resize/350x530!/quality/90/?url=http%3A%2F%2Fabebooks-brightspot.s3.us-west-2.amazonaws.com%2F98%2F4c%2Fdb9f6598465d820311e466fe6e9f%2Forlando.jpg' },
      { id: 5, image: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Frontispiece_promessi_sposi.jpg' },
    ]);

    return {
      books
    };
  }
};
</script>

<style scoped>
.item {
  min-height: 100vh;
}


.scroll-snap-container {
  height: 100%; 
  width: 100%; 
}

.book-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  margin: auto;
  display: block;
  height: 100%;
  width: 100%;
}
</style>
