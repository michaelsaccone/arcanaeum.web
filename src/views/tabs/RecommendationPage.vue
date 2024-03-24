<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tinder Swipe</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card v-if="currentBook"
                @touchstart="handleTouchStart"
                @touchmove="handleTouchMove"
                @touchend="handleTouchEnd"
                :class="currentBook.swipeDirection">
        <ion-card-content>
          <img :src="currentBook.image" alt="Book cover"/>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent } from '@ionic/vue';
import { ref } from 'vue';

const books = ref([
  { image: 'https://m.media-amazon.com/images/I/51hpvxtvT4L._AC_UF1000,1000_QL80_.jpg', swipeDirection: '' },
  { image: 'https://romis2016.files.wordpress.com/2020/03/boccaccio2.jpg', swipeDirection: '' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/9/93/LE_ULTIME_LETTERE_DI_JACOPO_ORTIS_1929.jpg', swipeDirection: '' },
  { image: 'https://assets.brightspot.abebooks.a2z.com/dims4/default/0d36bed/2147483647/strip/true/crop/218x330+0+0/resize/350x530!/quality/90/?url=http%3A%2F%2Fabebooks-brightspot.s3.us-west-2.amazonaws.com%2F98%2F4c%2Fdb9f6598465d820311e466fe6e9f%2Forlando.jpg', swipeDirection: '' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Frontispiece_promessi_sposi.jpg', swipeDirection: '' },
  // Aggiungi altre immagini di libri se necessario
]);

const likedBooks = ref([]);
const currentBookIndex = ref(0);

const currentBook = ref(books.value[currentBookIndex.value]);

const handleTouchStart = (event) => {
  currentBook.value.initialX = event.touches[0].clientX;
};

const handleTouchMove = (event) => {
  if (currentBook.value.initialX) {
    const currentX = event.touches[0].clientX;
    const difference = currentBook.value.initialX - currentX;

    if (Math.abs(difference) > 10) { // Controllo spazio percorso
      currentBook.value.currentX = currentX;
    }

    if (difference < -50) {
      // Swipe verso destra
      currentBook.value.swipeDirection = 'swipe-right';
    } else if (difference > 50) {
      // Swipe verso sinistra
      currentBook.value.swipeDirection = 'swipe-left';
    } else {
      currentBook.value.swipeDirection = '';
    }

  }
}

  const handleTouchEnd = (event) => {
    if (currentBook.value.initialX && currentBook.value.currentX) {
      const difference = currentBook.value.initialX - currentBook.value.currentX;

      if (difference < -50) {
        // Swipe verso destra
        likedBooks.value.push(currentBook.value);
        console.log('Libro aggiunto ai preferiti:', currentBook.value)
        for (const book in likedBooks.value) {
          console.log(likedBooks.value[book]);
        }
        currentBook.value.swipeDirection = 'swipe-right';

        nextBook();
      } else if (difference > 50) {
        // Swipe verso sinistra
        currentBook.value.swipeDirection = 'swipe-left';

        nextBook();
      }
    }

    // Ripristina le posizioni iniziali
    currentBook.value.initialX = null;
    currentBook.value.currentX = null;
  };

  const nextBook = () => {
    setTimeout(() => {
      if (currentBookIndex.value < books.value.length - 1) {
        currentBookIndex.value++;
        currentBook.value = {...books.value[currentBookIndex.value], swipeDirection: 'swipe-in'};

      }
    }, 400)

  }
</script>

<style scoped>
ion-card {
  position: relative;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.swipe-in {
  transition: transform 0s ease-out, opacity 0s ease-out;
}

.swipe-right {
  transform: translateX(150%) rotate(15deg);
  opacity: 0;
}

.swipe-left {
  transform: translateX(-150%) rotate(-15deg);
  opacity: 0;
}

ion-card:active {
  transform: scale(0.95);
}

ion-card-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

ion-card-content img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
