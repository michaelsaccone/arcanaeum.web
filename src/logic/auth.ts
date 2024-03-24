import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import {database} from "@/firebase";
import { auth } from "@/firebase";
import {UserCredential} from "firebase/auth";
import User from "@/models/User";
function classicLogin(email: string, password: string) {
    const user = signInWithEmailAndPassword(auth, email, password);
    return user;
}

async function register(name: string, surname: string, email: string, password: string) {
    const user: User = {
        name,
        surname,
        email
    };
    try {
        const credentials=
            await createUserWithEmailAndPassword(auth, email, password);
        // salva l'utente sul nostro db firestore
        // if()
        await addDoc(collection(database, "users"), user);

        console.log(credentials);
    } catch (error) {
        console.log(error.message)
    }
}

export { classicLogin, register }
