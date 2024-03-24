<script setup lang="ts">
//  Pagina iniziale per unirti ad una famiglia o crearne una nuova
//  Questa pagina viene vista una volta sola
import {
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonPage,
  IonFooter,
  IonHeader,
  IonSearchbar,
  IonButtons,
  IonList,
  IonAvatar,
  IonItem,
  IonLabel
} from '@ionic/vue';

function creaFamiglia() {
  console.log("Creazione famiglia:")
}

function cercaFamiglia() {
  console.log("Ricerca famiglia")
}

</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/settings"></ion-back-button>
        </ion-buttons>
        <ion-title>Famiglia</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-searchbar placeholder="Search" autocapitalize="off"></ion-searchbar>
      <ion-list>
        <ion-item>
          <ion-avatar slot="start">
            <ion-img src="https://i.pravatar.cc/300?u=b"/>
          </ion-avatar>
          <ion-label>
            <h2>Connor Smith</h2>
            <p>Sales Rep</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="start">
            <ion-img src="https://i.pravatar.cc/300?u=a"/>
          </ion-avatar>
          <ion-label>
            <h2>Daniel Smith</h2>
            <p>Product Designer</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="start">
            <ion-img src="https://i.pravatar.cc/300?u=d"/>
          </ion-avatar>
          <ion-label>
            <h2>Greg Smith</h2>
            <p>Director of Operations</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="start">
            <ion-img src="https://i.pravatar.cc/300?u=e"/>
          </ion-avatar>
          <ion-label>
            <h2>Zoey Smith</h2>
            <p>CEO</p>
          </ion-label>
        </ion-item>
      </ion-list>
      <!--Imposta il bottone in basso al centro-->
    </ion-content>
    <ion-footer>
      <ion-toolbar style="text-align: center;">
        <ion-button @click="creaFamiglia" id="open-modal" size="small" shape="round">Crea Famiglia</ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>