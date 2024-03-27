import Book from "@/models/Book";
import { getDoc, getDocs, setDoc, doc, updateDoc, arrayUnion, collection  } from "firebase/firestore";
import { database } from "@/firebase";
import storage from "@/plugins/storage";
import User from "@/models/User";
import LoggedUser from "@/models/LoggedUser";


// aggiunge un libro alla libreria di famiglia
async function addFamilyBook(book: Book) {

    const bookRef = doc(database, "books", book.isbn);
    await setDoc(bookRef, book)

    const userRef = await storage.get('userReference');
    try {
        await updateDoc(userRef, {
            books: arrayUnion(bookRef)
        })
    } catch (error) {
        console.log(error);
    }
}

// aggiunge un libro alla lista della spesa di famiglia
async function addBookToShopList(book: Book) {

    const bookRef = doc(database, "books", book.isbn);
    await setDoc(bookRef, book)

    const userRef = await storage.get('userReference');
    await updateDoc(userRef, {
        bookShopList: arrayUnion(bookRef)
    })
}

// aggiunge un libro alla lista dei libri da leggere dell'utente
async function addBookToFavourites(book: Book) {

    const bookRef = doc(database, "books", book.isbn);
    await setDoc(bookRef, book)

    const userRef = await storage.get('userReference');
    await updateDoc(userRef, {
        favouriteBooks: arrayUnion(bookRef)
    })

}

async function getUserBookType(type: string) {
    const loggedUser: LoggedUser = await storage.get('user');
    const booksRef = await getDocs(collection(database, "users",
        loggedUser.email, type));

    const books: Array<Book> = [];
    booksRef.forEach( (b) => {
        books.push(<Book>b.data())
    });

    console.log(books);

    return books;
}

// restituisce i libri della famiglia dell'utente
async function getFamilyBooks(): Promise<Array<Book>> {
    return await getUserBookType("books")
}

// restituisce i libri che l'utente desidera leggere
async function getUserFavouriteBooks(): Promise<Array<Book>> {
    return await getUserBookType("favouriteBooks");
}

// restituisce i libri che la famiglia intende comprare
async function getShopList(): Promise<Array<Book>> {
    return await getUserBookType("bookShopList");
}

export { addFamilyBook, addBookToFavourites, addBookToShopList, getFamilyBooks, getShopList, getUserFavouriteBooks };

