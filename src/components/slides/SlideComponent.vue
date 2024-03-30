<script setup lang="ts">

defineProps({
  imageUrl: String,
  title: String
})


</script>

<template>
  <div class="container">
    <div class="image-container">
      <!-- Image occupying the first half of the screen -->
      <img :src="imageUrl" alt="Image" class="image">
    </div>
    <h1 style="color: #f7f9fc"> {{ title }}</h1>
    <div class="text-container">
      <!-- Text occupying the rest of the screen -->
      <p class="text">
        <slot></slot>
      </p>
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
  margin-bottom: 2vh;
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
  margin-bottom: 6vh;
  margin-left: 6vw;
  margin-right: 6vw;
  color: mintcream;
  font-family: 'Segoe UI Semibold';
  font-size: 2.3vh;
}
</style>