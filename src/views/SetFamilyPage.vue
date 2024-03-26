<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="" @click="router.go(-1)"></ion-back-button>
        </ion-buttons>
        <ion-title>Famiglia</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-searchbar placeholder="Search" autocapitalize="off" v-model="searchQuery"></ion-searchbar>
      <ion-list>
        <ion-item v-for="member in filteredMembers" :key="member.id">
          <ion-avatar slot="start">
            <ion-icon :src="member.avatar" size="large"></ion-icon>
          </ion-avatar>
          <ion-label>
            <h2>{{ member.name }}</h2>
            <p>{{ member.role }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar style="text-align: center;">
        <ion-button @click="isCreateFamilyModalOpen = true; familyName = ''; selectedIcon = ''" id="open-modal" shape="round">Crea Famiglia</ion-button>
      </ion-toolbar>
    </ion-footer>

    <ion-modal :is-open="isCreateFamilyModalOpen" @closed="closeCreateFamilyModal">
      <ion-header>
        <ion-toolbar>
          <ion-title>Crea Famiglia</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="closeCreateFamilyModal">Chiudi</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content style="justify-content: center">
        <ion-item>
          <ion-input v-model="familyName" placeholder="Nome della famiglia"></ion-input>
        </ion-item>
        <br>
          <ion-button id="popover-button" color="danger" shape="round" strong >Scegli icona</ion-button>
          <ion-popover trigger="popover-button" dismiss-on-select size="cover" >
            <ion-content>
              <ion-list>
                <ion-radio-group v-model="selectedIcon">
                  <ion-item v-for="icon in iconsArray" :key="icon">
                    <ion-radio :value="icon"><ion-icon size="large" :icon="icon"> &nbsp;</ion-icon></ion-radio>
                  </ion-item>
                </ion-radio-group>
              </ion-list>
            </ion-content>
          </ion-popover>
        <ion-icon :icon="selectedIcon" class="displayedIcon" > </ion-icon>
        <ion-button @click="createFamily" expand="block" style="margin-top: 20px" :disabled="selectedIcon === ''">Crea</ion-button>
      </ion-content>
    </ion-modal>
    <ion-toast :is-open="showToast" :message="toastMessage" duration="3000"></ion-toast>
  </ion-page>
</template>

<script setup lang="ts">
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
  IonLabel,
  IonModal,
  IonToast,
  IonInput,
  IonIcon,
  IonBackButton,
  IonRadioGroup,
} from '@ionic/vue';
import { ref, computed } from 'vue';
import router from "@/router";
import {fish, flame, happy, pizza, skull, thumbsUp} from "ionicons/icons";

// Dati dei membri della famiglia
const members = ref([
  { id: 1, name: 'Esempio famiglia', role: 'Famiglia', avatar: fish },
]);



// Query di ricerca
const searchQuery = ref('');
const showToast = ref(false);
const toastMessage = ref("");

const isCreateFamilyModalOpen = ref(false);

const familyName = ref('');

const filteredMembers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return members.value.filter(member => member.name.toLowerCase().includes(query));
});

const selectedIcon = ref('');
const iconsArray = [fish, flame, happy, pizza, skull, thumbsUp];

function stampaIcona() {
  console.log(selectedIcon.value)
}

function closeCreateFamilyModal() {
  isCreateFamilyModalOpen.value = false;
}

function createFamily() {
  if (familyName.value.trim() !== '') {
    const existingFamily = members.value.find(member => member.name.toLowerCase() === familyName.value.toLowerCase());
    if (existingFamily) {
      showToastMessage("Non puoi creare una famiglia con lo stesso nome");
    } else {
      members.value.push({ id: members.value.length + 1, name: familyName.value, role: 'Famiglia', avatar: selectedIcon.value});
      closeCreateFamilyModal();
    }
  }
}

function showToastMessage(message: string) {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 2000);
}

</script>

<style scoped>

ion-radio {


  --color: transparent;
  --color-checked: transparent;
}

ion-radio.ios::part(container) {
  width: 20px;
  height: 20px;

  border: 2px solid #ddd;
  border-radius: 4px;
  visibility: hidden;
}

.radio-checked.ios::part(container) {
  border-color: #6815ec;
  visibility: hidden;
}

.displayedIcon {
  justify-content: flex-end;
  font-size: 50px;
}
</style>
```
