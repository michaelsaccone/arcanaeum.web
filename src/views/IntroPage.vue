
<template>
  <swiper
      :slides-per-view="1"
      :space-between="10"
  >
    <swiper-slide>
      <ion-page>
        <ion-content>
          <ion-header>
            <ion-toolbar>
              <ion-title class="custom-title">Benvenuto</ion-title>
            </ion-toolbar>
          </ion-header>
          <img
            alt="!Null"
            src="https://th.bing.com/th/id/OIP.K0-6kdzB4K1dH6p0oBdUBAHaEo?rs=1&pid=ImgDetMain"
          />
          <ion-list>
            <ion-item>
              <ion-checkbox class="custom-font" label-placement="stacked" alignment="center">Accetto il trattamento dei miei dati</ion-checkbox>
            </ion-item>

            <ion-item>
              <ion-checkbox class="custom-font" label-placement="stacked" alignment="center">Voglio ricevere notifiche sulle novità</ion-checkbox>
            </ion-item>
          </ion-list>
          </ion-content>
          
          <ion-footer>
            <ion-toolbar>
              <ion-chip color="secondary">Next</ion-chip>
            </ion-toolbar>
          </ion-footer>   
        
      </ion-page>
        
    </swiper-slide>

    <swiper-slide>
      <ion-page>
        <ion-content>
          <ion-header>
            <ion-toolbar>
              <ion-title class="custom-title">Accedi / Registrati</ion-title>
            </ion-toolbar>
          </ion-header>
        </ion-content>

          <ion-footer>
            <ion-toolbar>
              <ion-chip color="secondary">Previous</ion-chip>
              <ion-chip color="secondary">Next</ion-chip>
            </ion-toolbar>
          </ion-footer>   
        
      </ion-page>

    </swiper-slide>

    <swiper-slide>
      <ion-page>
        <ion-content>
          <ion-header>
            <ion-toolbar>
              <ion-title class="custom-title">Join us</ion-title>
            </ion-toolbar>
          </ion-header>
        </ion-content>
          <ion-footer>
            <ion-toolbar>
              <ion-chip  color="secondary">Previous</ion-chip>
              <ion-chip color="secondary">Next</ion-chip>
            </ion-toolbar>
          </ion-footer>   
        
      </ion-page>

    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide,  } from 'swiper/vue';
import { IonToolbar, IonFooter, IonButton, IonContent,IonPage, IonIcon, IonChip, IonHeader, IonTitle, IonCheckbox, IonItem, IonList } from '@ionic/vue';
import 'swiper/css';
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

