import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import {database} from "@/firebase";
import { auth } from "@/firebase";
import {UserCredential} from "firebase/auth";
import User from "@/models/User";

function classicLogin(email: string, password: string): Promise<UserCredential> {
    const user = signInWithEmailAndPassword(auth, email, password);
    return user;
}

async function register(email: string, password: string): Promise<UserCredential> {
    const user: User = {
        email,
        password,
        email
    };
    const credentials=
        createUserWithEmailAndPassword(auth, email, password);
    // TODO: salva l'utente sul nostro db firestore
    await addDoc(collection(database, "users"), user);
    console.log("Register: ", user);
    return credentials
}

export { classicLogin, register }
