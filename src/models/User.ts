import Book from "@/models/Book";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;
interface User {
    name: string;
    surname: string;
    email: string;
    books: Array<DocumentReference<Book>>;
    bookShopList: Array<DocumentReference<Book>>;
    favouriteBooks: Array<DocumentReference<Book>>;
}

export  default User;