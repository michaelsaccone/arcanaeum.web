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
      <ion-searchbar placeholder="Search" autocapitalize="off" v-model="searchQuery"></ion-searchbar>
      <ion-list>
        <ion-item v-for="member in filteredMembers" :key="member.id">
          <ion-label>
            <h2>{{ member.name }}</h2>
            <p>{{ member.role }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar style="text-align: center;">
        <ion-button @click="openCreateFamilyModal" id="open-modal" size="big" shape="round">Crea Famiglia</ion-button>
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
      <ion-content>
        <ion-item>
          <ion-input v-model="familyName" placeholder="Nome della famiglia"></ion-input>
        </ion-item>
        <ion-button @click="createFamily" expand="block">Crea</ion-button>
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
  IonItem,
  IonLabel,
  IonModal,
  IonToast,
  IonInput
} from '@ionic/vue';
import { ref, computed } from 'vue';

const members = ref([
  { id: 1, name: 'Esempio famiglia', role: 'Famiglia' }
]);

const searchQuery = ref('');
const showToast = ref(false);
const toastMessage = ref("");

const isCreateFamilyModalOpen = ref(false);

const familyName = ref('');

const filteredMembers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return members.value.filter(member => member.name.toLowerCase().includes(query));
});

function openCreateFamilyModal() {
  isCreateFamilyModalOpen.value = true;
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
      members.value.push({ id: members.value.length + 1, name: familyName.value, role: 'Famiglia' });
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
