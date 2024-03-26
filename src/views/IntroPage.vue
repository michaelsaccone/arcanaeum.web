<template>
  <ion-page>
    <ion-content>
      <swiper
          :slides-per-view="1"
          :space-between="0"
          :modules="modules"
          :pagination="{
            dynamicBullets: true,
          }"
          @reachEnd="isLastSlide = true"
          @slideChange="onSlideChange"
      >
        <swiper-slide style="background-color: #2fdf75">
          <slide image-url="/resources/imageSlide1.png" title="CATALOGA">
            CIAO
          </slide>
        </swiper-slide>

        <swiper-slide style="background-color: #6a64ff">
          <slide image-url="/resources/imageSlide1.png" title="CATALOGA">
            CIAO 2
          </slide>
        </swiper-slide>

        <swiper-slide style="background-color: #cf3c4f">
          <slide image-url="/resources/imageSlide2.png" title="CATALOGA">
            CIAO 3
          </slide>
        </swiper-slide>
      </swiper>
      <ion-fab slot="fixed" vertical="bottom" horizontal="center" style="margin-bottom: 25px">
        <ion-button style="width: 95vw" shape="round" fill="default" strong color="dark" href="/login">
          {{ isLastSlide ? 'Accedi' : 'Salta' }}
        </ion-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide,} from 'swiper/vue';
import {
  IonContent,
  IonPage,
} from '@ionic/vue';
import 'swiper/css';
import Slide from "@/components/slides/SlideComponent.vue";
import 'swiper/css';

import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import {ref} from "vue";

const modules = [ Pagination ];


const isLastSlide = ref(false);
function onSlideChange(event: any) {
  // console.log(event.isEnd)
  if(event.isEnd)
    isLastSlide.value = true;
  else isLastSlide.value = false;
}
</script>

<style scoped>

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;


  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-font {
  font-size: 20px;
}

.custom-title {
  font-family: 'Times New Roman', Times, serif;
  font-size: 25px;
}
</style>

