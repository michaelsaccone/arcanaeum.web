<script setup lang="ts">
    import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';

    function creaFamiglia(){
        console.log("Creazione famiglia:")
    }

    function cercaFamiglia(){
        console.log("Ricerca famiglia")
    }

    function tornaHome(){
        console.log("Ti trovi nella Home")
    }
</script>

<template>
    <ion-toolbar>
       
       <ion-title>Gestisci Famiglia</ion-title>

    </ion-toolbar>
        
    

        <ion-button  @click="creaFamiglia" id="o pen-modal" expand="block" href="/">Crea Famiglia</ion-button>
        <ion-button  @click="cercaFamiglia" id="o pen-modal" expand="block" href="/">Cerca Famiglia</ion-button>
        <ion-button  @click="tornaHome" id="o pen-modal" expand="block" href="/">annulla</ion-button>
</template>

<style scoped>

</style>