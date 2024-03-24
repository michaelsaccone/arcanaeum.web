import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { auth } from "@/firebase";
import {UserCredential} from "firebase/auth";
import User from "@/models/User";

function classicLogin(email: string, password: string): Promise<UserCredential> {
    const user = signInWithEmailAndPassword(auth, email, password);
    return user;
}

function register(name: string, surname: string, email: string, password: string): Promise<UserCredential> {
    const user: User = {
        name,
        surname,
        email
    };
    const credentials=
        createUserWithEmailAndPassword(auth, email, password);
    // TODO: salva l'utente sul nostro db firestore
    console.log("Register: ", user);
    return credentials
}

export { classicLogin, register }
