<script setup lang="ts">
</script>

<template>
  <div class="container">
    <div class="image-container">
      <!-- Image occupying the first half of the screen -->
      <img src="/resources/imageSlide2.png" alt="Image" class="image">
    </div>
    <div class="text-container">
      <!-- Text occupying the rest of the screen -->
      <p class="text">Crea il tuo spazio personale di lettura con Arcanaeum. Aggiungi i tuoi libri preferiti, scopri nuove opere e lasciati ispirare dalle raccomandazioni personalizzate.</p>
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
  width: 90%; /* Increase the image width to make it bigger */
  height: auto;
  max-height: 80%;
  object-fit: contain;
}

.text {
  text-align: center;
  font-size: 20px;
}
</style>
