import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

interface LoggedUser {
    name: string;
    email: string;
    accessToken: string;
    expirationTime: Timestamp;
    refreshToken: string;
}

export default LoggedUser;
