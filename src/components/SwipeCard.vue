<template>
  <div class="swipe-card" @panmove="onPanMove" @panend="onPanEnd">
    <div class="card" :style="{ 'background-image': 'url(' + image + ')', transition: 'transform 0.3s, box-shadow 0.3s' }">
      <!-- Card content here -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwipeCard',
  props: {
    image: String
  },
  methods: {
    onPanMove(event) {
      // Gestisci il movimento della carta qui
    },
    onPanEnd(event) {
      const deltaX = event.deltaX;
      const direction = deltaX > 0 ? 'right' : 'left';

      this.animateDrop(direction);
    },
    animateDrop(direction) {
      const dropDistance = direction === 'right' ? '100px' : '-100px';
      this.$el.style.transition = 'transform 0.5s ease-in-out';
      this.$el.style.transform = `translateY(${dropDistance}) rotate(${direction === 'right' ? 15 : -15}deg)`;

      // Rimuovi la carta dopo che l'animazione è completata
      setTimeout(() => {
        this.$emit('swiped', direction);
        this.$emit('remove');
      }, 500);
    }
  }
};
</script>

<style scoped>
.swipe-card {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: 300px;
  height: 400px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  position: relative;
}

.card:hover {
  transform: translateY(-15px); /* Ingrandisce leggermente durante il passaggio del mouse */
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.3); /* Effetto ombra leggermente più accentuato */
}

</style>
