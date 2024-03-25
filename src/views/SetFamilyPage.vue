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
          <ion-avatar slot="start">
            <ion-img :src="member.avatar"></ion-img>
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
        <ion-button @click="openCreateFamilyModal" id="open-modal" size="big" shape="round">Crea Famiglia</ion-button>
      </ion-toolbar>
    </ion-footer>

    <!-- Modal per la creazione della famiglia -->
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
  IonAvatar,
  IonItem,
  IonLabel,
  IonModal,
  IonToast,
  IonInput
} from '@ionic/vue';
import { ref, computed } from 'vue';

// Dati dei membri della famiglia
const members = ref([
  { id: 1, name: 'Connor Smith', role: 'Sales Rep', avatar: 'https://i.pravatar.cc/300?u=b' },
  { id: 2, name: 'Daniel Smith', role: 'Product Designer', avatar: 'https://i.pravatar.cc/300?u=a' },
  { id: 3, name: 'Greg Smith', role: 'Director of Operations', avatar: 'https://i.pravatar.cc/300?u=d' },
  { id: 4, name: 'Zoey Smith', role: 'CEO', avatar: 'https://i.pravatar.cc/300?u=e' }
]);

// Query di ricerca
const searchQuery = ref('');
const showToast = ref(false);
const toastMessage = ref("");

// Variabile per indicare se il modal di creazione della famiglia è aperto
const isCreateFamilyModalOpen = ref(false);

// Nome della famiglia inserito dall'utente
const familyName = ref('');

// Filtrare i membri in base alla query di ricerca
const filteredMembers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return members.value.filter(member => member.name.toLowerCase().includes(query));
});

// Funzione per aprire il modal di creazione della famiglia
function openCreateFamilyModal() {
  isCreateFamilyModalOpen.value = true;
}

// Funzione per chiudere il modal di creazione della famiglia
function closeCreateFamilyModal() {
  isCreateFamilyModalOpen.value = false;
}

// Funzione per creare la famiglia
function createFamily() {
  if (familyName.value.trim() !== '') {
    const existingFamily = members.value.find(member => member.name.toLowerCase() === familyName.value.toLowerCase());
    if (existingFamily) {
      showToastMessage("Non puoi creare una famiglia con lo stesso nome");
    } else {
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      const familyInitial = familyName.value.charAt(0).toUpperCase();
      members.value.push({ id: members.value.length + 1, name: familyName.value, role: 'Famiglia', avatar: `https://ui-avatars.com/api/?name=${familyInitial}&background=${randomColor}&color=fff` });
      closeCreateFamilyModal();
    }
  }
}

// Funzione per mostrare il toast
function showToastMessage(message: string) {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 2000);
}
</script>
