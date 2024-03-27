import Book from "@/models/Book";


// aggiunge un libro alla libreria di famiglia
async function addFamilyBook(book: Book) {
    console.log(book);
}

// restituisce i libri della famiglia dell'utente
async function getFamilyBooks(): Promise<Array<Book>> {
    return [];
}

// restituisce i libri che l'utente desidera leggere
async function getUserFavouriteBooks(): Promise<Array<Book>> {
    return [];
}

// restituisce i libri che la famiglia intende comprare
async function getShopList(): Promise<Array<Book>> {
    return [];
}

// aggiunge un libro alla lista della spesa di famiglia
async function addBookToShopList(book: Book) {
    console.log(book);
}

// aggiunge un libro alla lista dei libri da leggere dell'utente
async function addBookToFavourites(book: Book) {
    console.log(book);
}

