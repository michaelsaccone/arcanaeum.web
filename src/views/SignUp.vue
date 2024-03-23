<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title><center>Login</center></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="login-logo">
        <img src="/resources/logoArcaneum.jpg" alt="Ionic logo" />
      </div>

      <form novalidate @submit.prevent="onLogin">
        <ion-list>
          <ion-item class="input-box">
            <ion-input
                label="Nome"
                labelPlacement="stacked"
                v-model="username"
                name="username"
                type="text"
                :spellcheck="false"
                autocapitalize="off"
                required
            ></ion-input>
          </ion-item>

          <ion-item class="input-box">
            <ion-input
                label="Cognome"
                labelPlacement="stacked"
                v-model="cognome"
                name="username"
                type="text"
                :spellcheck="false"
                autocapitalize="off"
                required
            ></ion-input>
          </ion-item>

          <ion-item class="input-box">
            <ion-input
                label="Email"
                labelPlacement="stacked"
                v-model="email"
                name="username"
                type="text"
                :spellcheck="false"
                autocapitalize="off"
                required
            ></ion-input>
          </ion-item>

          <ion-item class="input-box">
            <ion-input
                labelPlacement="stacked"
                label="Password"
                v-model="password"
                name="password"
                type="password"
                required
            ></ion-input>
          </ion-item>
        </ion-list>

        <ion-row responsive-sm class="ion-padding">
          <ion-col>
            <ion-button :disabled="!canSubmit" type="submit" expand="block"
            >Login</ion-button
            >
          </ion-col>
          <ion-col>
            <ion-button
                :disabled="!canSubmit"
                @click="onSignup"
                color="light"
                expand="block"
            >Signup</ion-button
            >
          </ion-col>
        </ion-row>
      </form>
      <ion-toast
          :is-open="showToast"
          :message="toastMessage"
          :duration="2000"
      ></ion-toast>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.login-logo {
  padding: 20px 0;
  min-height: 200px;
  text-align: center;
}

.login-logo img {
  max-width: 150px;
}

.list {
  margin-bottom: 0;
}
</style>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonTitle,
  IonRow,
  IonCol,
  IonInput,
  IonToast,
} from "@ionic/vue";

const username = ref("");
const cognome = ref("");
const email = ref("");
const password = ref("");
const submitted = ref(false);

const usernameValid = true;
const passwordValid = true;

const showToast = ref(false);
const toastMessage = ref("");

const canSubmit = computed(
    () => username.value.trim() !== "" && password.value.trim() !== ""
);

const onLogin = () => {
  submitted.value = true;
  if (usernameValid && passwordValid) {
  }
};

const onSignup = () => {
  toastMessage.value = "Successfully logged in!";

  showToast.value = true;


  username.value = "";
  cognome.value = "";
  email.value = "";
  password.value = "";
};


</script>

<style>
.input-box {
  max-width: 700px;
}
</style>