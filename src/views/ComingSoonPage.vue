<script setup lang="ts">
import {IonPage, IonContent, IonText} from "@ionic/vue";
import Logo from "@/components/LogoComponent.vue";
</script>

<template>
  <ion-page>
    <ion-content>
      <logo />
      <ion-text color="primary" class="center">
        <h1>
          Funzionalità in Sviluppo! <br>
          Stay Tuned!
        </h1>
      </ion-text>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.center {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>