import {signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import {database} from "@/firebase";
import { auth } from "@/firebase";
import {UserCredential} from "firebase/auth";
import User from "@/models/User";
import storage from "@/plugins/storage";
import LoggedUser from "@/models/LoggedUser";

function getLoggedUser(cred: UserCredential | any): LoggedUser {
    const loggedUser: LoggedUser = {
        name: cred.user.displayName!,
        email: cred.user.email!,
        accessToken: cred.user.stsTokenManager!.accessToken,
        expirationTime: cred.user.stsTokenManager!.expirationTime,
        refreshToken: cred.user.refreshToken
    };
    return loggedUser;
}
async function classicLogin(email: string, password: string) {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    await storage.set('user', getLoggedUser(credentials))
    await storage.set('isLogged', true);
    console.log(await storage.get('user'));
    return credentials;
}

async function register(name: string, surname: string, email: string, password: string): Promise<UserCredential> {
    const user: User = {
        name,
        surname,
        email
    };
    try {
        const credentials= await createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                updateProfile(result.user, {
                    displayName: name
                });
                return result;
            })
        // salva l'utente sul nostro db firestore
        await addDoc(collection(database, "users"), user);
        await storage.set('user', getLoggedUser(credentials))
        await storage.set('isLogged', true);
        console.log(await storage.get('user'));
        return credentials;
    } catch (error) {
        throw new Error("Errore nella registrazione");
    }
}

async function logout() {
    await storage.set('isLogged', false);
    await storage.set('user', null);
}

export { classicLogin, register, logout };
