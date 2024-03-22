<template>
  <ion-page>
    <div class="overlay">
      <ion-header>
        <ion-toolbar>
          <ion-title><center>Login</center></ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <div class="form-container">
          <ion-item>
            <div class="testo">
              <ion-label class="block-label">Nome</ion-label>
            </div>
            <div class="input-box">
              <ion-input class="nome"></ion-input>
            </div>
          </ion-item>
          <ion-item>
            <div class="testo">
              <ion-label class="block-label">Cognome</ion-label>
            </div>
            <div class="input-box">
              <ion-input class="cognome"></ion-input>
            </div>
          </ion-item>
          <ion-item>
            <div class="testo">
              <ion-label class="block-label">Email</ion-label>
            </div>
            <div class="input-box">
              <ion-input class="email"></ion-input>
            </div>
          </ion-item>
          <ion-item>
            <div class="testo">
              <ion-label class="block-label">Password</ion-label>
            </div>
            <div class="input-box">
              <ion-input type="password"></ion-input>
            </div>
          </ion-item>
          <br>
          <ion-button expand="full" >Login</ion-button>
        </div>
      </ion-content>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.form-container {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  margin: 90px auto;
  padding: 20px;
  background-color: #242424;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


.block-label {
  display: block;
}

ion-title {
  color: white;
  font-weight: bold;
}

.testo {
  width: 30%;
  margin-right: 60px;
  font-weight: bold;
}

.input-box {
  width: 70%;
  right: 0;
  border: 1px solid #707070;
  width: fit-content;
}
</style>
