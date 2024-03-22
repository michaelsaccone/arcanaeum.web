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

    var modal = document.querySelector('ion-modal');
    var searchBar = document.querySelector('ion-searchbar');

    
</script>

        <template>
            <ion-toolbar>
            
            <ion-title>Gestisci Famiglia</ion-title>

            </ion-toolbar>
            <ion-button  @click="tornaHome" id="o pen-modal" expand="block" href="/">annulla</ion-button>
            <ion-button  @click="creaFamiglia" id="o pen-modal" expand="block" href="/">Crea Famiglia</ion-button>
            
            <ion-content class="ion-padding">
            <ion-button id="open-modal" expand="block">Cerca Famiglia</ion-button>

            <ion-modal trigger="open-modal" initial-breakpoint="0.25">
                <ion-content>
                <ion-searchbar placeholder="Search"></ion-searchbar>
                <ion-list>
                    <ion-item>
                    <ion-avatar slot="start">
                        <ion-img src="https://i.pravatar.cc/300?u=b" />
                    </ion-avatar>
                    <ion-label>
                        <h2>Connor Smith</h2>
                        <p>Sales Rep</p>
                    </ion-label>
                    </ion-item>
                    <ion-item>
                    <ion-avatar slot="start">
                        <ion-img src="https://i.pravatar.cc/300?u=a" />
                    </ion-avatar>
                    <ion-label>
                        <h2>Daniel Smith</h2>
                        <p>Product Designer</p>
                    </ion-label>
                    </ion-item>
                    <ion-item>
                    <ion-avatar slot="start">
                        <ion-img src="https://i.pravatar.cc/300?u=d" />
                    </ion-avatar>
                    <ion-label>
                        <h2>Greg Smith</h2>
                        <p>Director of Operations</p>
                    </ion-label>
                    </ion-item>
                    <ion-item>
                    <ion-avatar slot="start">
                        <ion-img src="https://i.pravatar.cc/300?u=e" />
                    </ion-avatar>
                    <ion-label>
                        <h2>Zoey Smith</h2>
                        <p>CEO</p>
                    </ion-label>
                    </ion-item>
                </ion-list>
                </ion-content>
            </ion-modal>
        </ion-content>

        
</template>

<style scoped>

</style>