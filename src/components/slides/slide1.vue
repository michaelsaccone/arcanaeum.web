<script setup lang="ts">
</script>

<template>
  <div class="container">
    <div class="image-container">
      <!-- Image occupying the first half of the screen -->
      <img src="/resources/imageSlide1.png" alt="Image" class="image">
    </div>
    <div class="text-container">
      <!-- Text occupying the rest of the screen -->
      <p class="text">Esplora un mondo di libri senza limiti. Arcanaeum ti offre accesso istantaneo a una vasta selezione di opere letterarie, adattate ai tuoi gusti personali.</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;
}

.text-container {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  width: 80%;
  height: auto;
  max-height: 80%;
  object-fit: contain;
}

.text {
  text-align: center;
  font-size: 20px;
}
</style>
