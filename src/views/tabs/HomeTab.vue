<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="custom-toolbar">
        <div style="align:left; margin-left:20px">
          <ion-title class="custom-title" style="text-align: left">ARCANAEUM personale</ion-title>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-card v-for="(item, index) in items" :key="index">
          <ion-card-header>
            <!-- Add image above the card subtitle -->
            <ion-card-subtitle>{{ item.author }}</ion-card-subtitle>
            <ion-card-title>{{ item.title }}</ion-card-title>
            <ion-card-subtitle>{{ item.year }}</ion-card-subtitle>
            <ion-img :src="item.coverImage" style="max-width: 80%;"></ion-img>
          </ion-card-header>
          <ion-card-content :style="{ maxHeight: item.showMore ? 'none' : '50px', overflow: item.showMore ? 'none' : 'hidden', transition: 'max-height 0.3s' }">
            <template v-if="!item.showMore">
              {{ item.shortDescription }}
            </template>
            <template v-else>
              {{ item.longDescription }}
            </template>
          </ion-card-content>
          <ion-button fill="clear" @click="toggleDescription(index)">{{ item.showMore ? 'Nascondi libro' : 'Mostra libro' }}</ion-button>
        </ion-card>
      </ion-list>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-button id="open-action-sheet">
          <ion-icon :icon="add"></ion-icon>
        </ion-button>
      </ion-fab>
        <ion-action-sheet trigger="open-action-sheet" header="Actions" :buttons="actionSheetButtons"></ion-action-sheet>

      <ion-modal ref="modal" show-backdrop trigger="open-modal-form-1" @willDismiss="onWillDismiss">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="cancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Welcome</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="confirm()" :disabled="!areFieldsFilled()">Confirm</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-input
                ref="input"
                type="text"
                label="Title"
                label-placement="floating"
                placeholder="Scrivi ..."
                v-model="addBookTitle"
            ></ion-input>
          </ion-item>
          <br>
          <ion-item>
            <ion-input
                ref="input"
                type="text"
                label="Autore"
                label-placement="floating"
                placeholder="Scrivi ..."
                v-model="addBookAuthor"
            ></ion-input>
          </ion-item>
          <br>
          <ion-item>
            <ion-input
                ref="input"
                type="date"
                label="Anno"
                label-placement="floating"
                placeholder="Scrivi ..."
                pattern="[0-9]*"
                v-model="addBookYear"
            ></ion-input>
          </ion-item>
          <br>
          <ion-item>
            <ion-input
                ref="input"
                type="text"
                label="Descrizione personale del libro"
                label-placement="floating"
                placeholder="Scrivi ..."
                v-model="addBookDescription"
            ></ion-input>
          </ion-item>
          <br>

              <ion-button fill="clear">
                Inserisci la copertina
              </ion-button>

        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonActionSheet,
  IonPage,
  IonContent,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonInput, IonItem, IonButtons, IonModal, IonFab, IonIcon
} from '@ionic/vue';
import {reactive, ref} from 'vue';
import {OverlayEventDetail} from "@ionic/core/components";
import {add} from "ionicons/icons";

interface Item {
  title: string;
  year: number;
  author: string;
  shortDescription: string;
  longDescription: string;
  showMore: boolean;
  coverImage: string; // Add cover image property to Item interface
}

    const items = reactive<Item[]>([
      {
        title: "Siddhartha",
        year: 2012,
        author: "Hermann Hesse",
        shortDescription: "Chi è Siddharta? È uno che cerca, e cerca soprattutto di vivere intera la propria vita.",
        longDescription: "Chi è Siddharta? È uno che cerca, e cerca soprattutto di vivere intera la propria vita. Passa di esperienza in esperienza, dal misticismo alla sensualità, dalla meditazione filosofica alla vita degli affari, e non si ferma presso nessun maestro, non considera definitiva nessuna acquisizione, perché ciò che va cercato è il tutto, il misterioso tutto che si veste di mille volti cangianti. E alla fine quel tutto, la ruota delle apparenze, rifluirà dietro il perfetto sorriso di Siddharta, che ripete il \"costante, tranquillo, fine, impenetrabile, forse benigno, forse schernevole, saggio, multirugoso sorriso di Gotama, il Buddha, quale egli stesso l'aveva visto centinaia di volte con venerazione\". Siddharta è senz'altro l'opera di Hesse più universalmente nota. Questo breve romanzo di ambiente indiano, pubblicato per la prima volta nel 1922, ha avuto infatti in questi ultimi anni una strepitosa fortuna. Prima in America, poi in ogni parte del mondo, i giovani lo hanno riscoperto come un loro testo, dove non trovavano solo un grande scrittore moderno ma un sottile e delicato saggio, capace di dare, attraverso questa parabola romanzesca, un insegnamento sulla vita che evidentemente i suoi lettori non incontravano altrove.",
        showMore: false,
        coverImage: "/resources/cover1.jpg"
      },
      {
        title: "Appunti di luce cosmica",
        year: 2022,
        author: "Michael Jason Saccone",
        shortDescription: "Puoi affidarti alla luce che nessuno può spegnere: la Luce Cosmica",
        longDescription: "Quando, durante l’esistenza, si spengono tutti i lampioni e pare d’essere al buio, non temere la notte.\n" +
            "\n Puoi affidarti alla luce che nessuno può spegnere: la Luce Cosmica.\n" +
            "\n Riflettendo quella luce, allineandola con l'iride, ho appuntato qui le mie percezioni del vivere.\n" +
            "\n Questa è la mia prima raccolta ufficiale di note, pensieri e racconti.\n" +
            "\n Puramente ed unicamente un manufatto umano, la visione esistenziale di un bambino che, messo alle strette dai fantasmi del suo tempo, annota le conclusioni affrettate di un viaggio di sguardi: da un marciapiede alle stelle. Dalle luci dei lampioni al fragore degli astri.",
        showMore: false,
        coverImage: "/resources/cover2.jpg"
      },
      {
        title: "JAVA: La guida in 7 giorni più completa",
        year: 1999,
        author: "L.S.",
        shortDescription: "Scopri e sperimenta la programmazione Java",
        longDescription: "Vorresti scoprire come programmare con il linguaggio Java?\n" +
            "Ti piacerebbe imparare i codici di programmazione e creare un gestionale dinamico e di successo?\n" +
            "Desideri conoscere tutti i segreti della programmazione?\n" +
            "\n Potresti non aver mai programmato prima d’oggi o forse se già un esperto nel settore; potresti essere uno studente universitario alle prime armi, o un neofita dell’informatica in cerca di novità. Qualsiasi persona tu sia, questo libro fa per te: scoprirai come programmare con Java e usare tutte le tecniche e le funzionalità del linguaggio di programmazione più noto e usato nel mondo.\n" +
            "\n Grazie a questo libro, capitolo dopo capitolo, scoprirai come usare e sfruttare un linguaggio semplice e dettagliato, e potrai anche comprendere anche i concetti più complessi e difficili. E sarai in grado di realizzare e pianificare programmi perfettamente funzionanti e di successo.",
        showMore: false,
        coverImage: "/resources/cover3.jpg"
      },
      {
        title: "Mein Kampf - La mia battaglia",
        year: 1945,
        author: "A.H.",
        shortDescription: "\"Mein Kampf (La mia battaglia)\" è l'autobiografia politica di Adolf Hitler.",
        longDescription: "\"Mein Kampf,\" authored by Adolf Hitler, the renowned leader of the National Socialist German Workers' Party (NSDAP), is his autobiographical manifesto. Within its pages, Hitler describes his personal story, political beliefs, and hopes for Germany's future. The work digs into his extremist philosophy, promoting Aryan supremacy and openly anti-Semitic attitudes, leading in one of humanity's darkest periods. Despite its revolting nature, \"Mein Kampf\" remains an important historical artifact, emphasizing the devastating implications of uncontrolled hatred and the need for vigilance against such beliefs in modern society. This challenging book continues to spark debate and criticism among researchers and historians, emphasizing the importance of understanding history's darkest chapters to prevent their recurrence.",
        showMore: false,
        coverImage: "/resources/cover4.jpg"
      },

    ]);
    const actionSheetButtons = [
      {
        text: 'Aggiungi manualmente',
        id: 'open-modal-form-1',
        data: {
          action: 'addManually',
        },
      },
      {
        text: 'Cerca nel catalogo',
        id: 'open-modal-catalgue',
        data: {
          action: 'searchToAdd',
        },
      },
      {
        text: 'Cancel',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ];



    const toggleDescription = (index: number) => {
      items[index].showMore = !items[index].showMore;
    };

const modal = ref();
const input = ref();
const message = ref('This modal example uses triggers to automatically open a modal when the button is clicked.');

const addBookTitle = ref("");
const addBookAuthor = ref("");
const addBookYear = ref("");
const addBookDescription = ref("");

function printCiao() {
  console.log(addBookTitle.value);
}

const cancel = () => modal.value.$el.dismiss(null, 'cancel');

const confirm = () => {
  const name = input.value.$el.value;
  modal.value.$el.dismiss(name, 'confirm');
};

const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
  if (ev.detail.role === 'confirm') {
    message.value = `Hello, ${ev.detail.data}!`;
  }
};
const areFieldsFilled = () => {
  return addBookTitle.value.trim() !== "" &&
      addBookAuthor.value.trim() !== "" &&
      addBookYear.value.trim() !== "" &&
      addBookDescription.value.trim() !== "";
};
</script>

<style>
svg {
  width: 20px;
  height: 20px;
  display: inline-block;
}

.infinite-scroll-content {
  text-align: center;
  padding: 20px 0;
}

ion-card-content {
  transition: max-height 0.3s ease;
}

ion-modal {
  --height: 50%;
  --border-radius: 16px;
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

ion-modal::part(backdrop) {
  background: rgba(209, 213, 219);
  opacity: 1;
}

ion-modal ion-toolbar {
  --background: rgb(14 116 144);
  --color: white;
}
.custom-toolbar {
  --min-height: 40px; /* Modifica l'altezza minima della toolbar */
}

.custom-title {
  font-size: 18px; /* Riduci la dimensione del font del titolo */
}
  * {
    font-family: Helvetica, Arial, sans-serif;
  }

</style>
