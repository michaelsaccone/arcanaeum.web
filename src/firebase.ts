// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported  } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_GsGRYEL8e8jwPiYzP0AW_aTxTAat0aw",
    authDomain: "web-arcanaeum.firebaseapp.com",
    projectId: "web-arcanaeum",
    storageBucket: "web-arcanaeum.appspot.com",
    messagingSenderId: "499987521706",
    appId: "1:499987521706:web:b01c48c7ac5aab7f29b0d3",
    measurementId: "G-D5FP6PTTX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export const auth = getAuth(app);
export const database = getFirestore(app);

export default app;
