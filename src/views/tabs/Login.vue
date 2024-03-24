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
          <ion-item class="input-box" v-show="signupEnabled">
            <ion-input
                label="Nome"
                labelPlacement="stacked"
                v-model="name"
                name="username"
                type="text"
                :spellcheck="false"
                autocapitalize="off"
                required
            ></ion-input>
          </ion-item>

          <ion-item class="input-box" v-show="signupEnabled">
            <ion-input
                label="Cognome"
                labelPlacement="stacked"
                v-model="surname"
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
          <ion-button v-show="!signupEnabled" :disabled="!canSubmit" type="submit" expand="block" @click="onLogin" style="width: 100%; margin-bottom: 25px; margin-top: 15px">Accedi</ion-button>
          <div v-show="!signupEnabled" style="text-align: center; color: rgba(40,155,196,0.93); text-decoration-line: underline" @click="enableSignup">- Non hai un account? -</div>
          <div v-show="signupEnabled" style="text-align: center; color: rgba(40,155,196,0.93); text-decoration-line: underline" @click="disableSignup">- Hai già un account? -</div>
          <ion-button v-show="signupEnabled" style="width: 100%; margin-top: 25px;" :disabled="!canSubmit && !signupEnabled" @click="onSignup" color="light" expand="block">Registrati</ion-button>
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
  IonInput,
  IonToast,
} from "@ionic/vue";
import {register} from "@/logic/auth";

const name = ref("");
const surname = ref("");
const email = ref("");
const password = ref("");
const submitted = ref(false);

let signupEnabled = false;

const usernameValid = true;
const passwordValid = true;

const showToast = ref(false);
const toastMessage = ref("");

const canSubmit = computed(
    () => email.value.trim() !== "" && password.value.trim() !== ""
);

window.onload = () => {
  console.log(signupEnabled);
};

const enableSignup = () => {
  signupEnabled = true;
  console.log("Signup enabled");
  console.log(signupEnabled);
};

const disableSignup = () => {
  signupEnabled = false;
  console.log("Signup disabled");
  console.log(signupEnabled);
};

const onLogin = () => {
  submitted.value = true;
  if (usernameValid && passwordValid) {
    /* empty */
  }
};

const onSignup = async () => {
  toastMessage.value = "Successfully logged in!";

  const a = await register(name.value, surname.value);

  console.log("REGISTRATO ", a);

  showToast.value = true;

  name.value = "";
  surname.value = "";
  email.value = "";
  password.value = "";
};

</script>

<style>
.input-box {
  max-width: 700px;
}

</style>