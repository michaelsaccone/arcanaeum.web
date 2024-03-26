<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>{{title}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="login-logo">
        <img src="/resources/logoArcaneum.png" alt="Ionic logo" />
      </div>

      <form novalidate @submit.prevent="onLogin" v-if="!signupEnabled">
        <ion-list>
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
        <ion-button :disabled="!canSubmit" type="submit" expand="block" @click="onLogin" style="width: 100%; margin-bottom: 25px; margin-top: 15px">
          Accedi
        </ion-button>

        <div  style="text-align: center; color: rgba(40,155,196,0.93);" @click="enableSignup">
           Non hai un account?
        </div>
      </form>


      <form novalidate @submit.prevent="onLogin" v-else>
        <ion-list>
          <ion-item class="input-box">
            <ion-input
                label="Nome"
                labelPlacement="stacked"
                v-model="name"
                name="username"
                type="text"
                :spellcheck="false"
                autocapitalize="off"
            ></ion-input>
          </ion-item>

          <ion-item class="input-box">
            <ion-input
                label="Cognome"
                labelPlacement="stacked"
                v-model="surname"
                name="username"
                type="text"
                :spellcheck="false"
                autocapitalize="off"
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

        <ion-button style="width: 100%; margin-top: 25px; margin-bottom: 25px" :disabled="!canSubmit && !signupEnabled" @click="onSignup" color="light" expand="block">
          Registrati
        </ion-button>

        <div  style="text-align: center; color: rgba(40,155,196,0.93);" @click="disableSignup">
           Hai già un account?
        </div>


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
import {computed, ref} from "vue";
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
import {register, classicLogin } from "@/logic/auth";
import router from "@/router";

const name = ref("");
const surname = ref("");
const email = ref("");
const password = ref("");
const submitted = ref(false);

const title = ref('Login');

const signupEnabled = ref(false);

const usernameValid = ref(true);
const passwordValid = ref(true);

const showToast = ref(false);
const toastMessage = ref("");

const canSubmit = computed(
    () => email.value.trim() !== "" && password.value.trim() !== ""
);


const disableSignup = () => {
  signupEnabled.value = false;
  title.value = 'Login';
};

const enableSignup = () => {
  signupEnabled.value = true;
  password.value = "";
  title.value = 'Registrati';
};

const onLogin = async () => {
  submitted.value = true;
  try {
    await classicLogin(email.value, password.value);
    router.push("/tabs/home")
  } catch (error) {
    // TODO: Toast notification for login error
  } finally {
    resetFields();
  }
};

const onSignup = async () => {
  try {
    const a = await register(name.value, surname.value, email.value, password.value);
    console.log("REGISTRATO ", a);
    toastMessage.value = "Registrato con successo";
  } catch (error) {
    toastMessage.value = "Errore di registrazione!";
    // TODO: Toast notification for login error
  } finally {
    showToast.value = true;
    signupEnabled.value = false;
    resetFields();
  }
};

function resetFields() {
  name.value = "";
  surname.value = "";
  email.value = "";
  password.value = "";
}

</script>

<style>
.input-box {
  max-width: 700px;
}

</style>