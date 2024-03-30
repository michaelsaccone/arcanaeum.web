import Book from "@/models/Book";

class bookScraper {

    public async getBookByISBN(isbn: string): Promise<Book> {
        const books = await this.cercaLibri(isbn, 'isbn');
        return books[0];
    }

    public async findBooksByQuery(query: string) {
        const booksByTitle = await this.cercaLibri(query, 'intitle', "");
        // const booksByAuthor = await this.cercaLibri(query, 'inauthor', "");

        let books: Book[] = [];

        books = booksByTitle
            .slice(0, 15)

        return books;
    }

    public async findByGenre(genreName: string) {
        let foundBooks: Array<Book> = [];

        foundBooks = await this.findBooksByQuery(genreName);

        // Filtra i libri trovati per il genere cliccato
        const filteredBooks = foundBooks.filter(book => {
            // Controlla se il genere è incluso nei generi del libro
            const genreIncluded = book.genres.includes(genreName);
            // Controlla se il genere è incluso nel titolo del libro
            const genreInTitle = book.title.toLowerCase().includes(genreName);
            return genreIncluded || genreInTitle; // Include il libro se il genere è incluso nei generi del libro o nel titolo del libro
        });

        // Ordina l'array filtrato in ordine alfabetico per titolo
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
        // Aggiungi libri dall'array non filtrato se il numero di libri filtrati è inferiore a 10
        const additionalBooks = foundBooks.filter(book => !filteredBooks.includes(book));
        const numAdditionalBooks = 10 - filteredBooks.length;
        const moreBooks = additionalBooks.slice(0, numAdditionalBooks);

        const finalBooks = filteredBooks.concat(moreBooks);
        return finalBooks
    }

    public async cercaLibriFinale(cerca: string, genere?: string): Promise<Book[]> {
        const ricercaISBN = await this.cercaLibri(cerca, 'isbn', genere);
        if (ricercaISBN.length < 1) {
            const ricercaTitolo = await this.cercaLibri(cerca, 'intitle', genere);
            const ricercaAutore = await this.cercaLibri(cerca, 'inauthor', genere);
            let ricercaFinale: Book[] = [];
            if (ricercaAutore.length <= 2) {
                ricercaFinale = ricercaTitolo
                    .slice(0, 20 - ricercaAutore.length)
                    .concat(ricercaAutore);
            } else {
                ricercaFinale = ricercaTitolo.slice(0, 12).concat(ricercaAutore.slice(0, 8));
            }

            // Seleziona casualmente un sottoinsieme dei libri ottenuti
            ricercaFinale = this.shuffleArray(ricercaFinale);

            return ricercaFinale;
        } else {
            return ricercaISBN;
        }
    }

    // Funzione per effettuare la chiamata alle API di Google Books e selezionare casualmente un sottoinsieme dei libri ottenuti
    public async cercaLibri(cerca: string, ricercaDa: string, genere?: string): Promise<Book[]> {
        let url = `https://www.googleapis.com/books/v1/volumes?q=${ricercaDa}:${cerca}&maxResults=40`;
        if (genere) {
            url += `+subject:${genere}`;
        }

        try {
            const risposta = await fetch(url);
            const data = await risposta.json();

            if (!data || data.totalItems === 0 || !data.items) {
                // Nessun risultato trovato
                return [];
            }

            const libri: Array<Book> = data.items.map((libro: any) => {
                const volumeInfo = libro.volumeInfo || {};
                const industryIdentifiers = volumeInfo.industryIdentifiers || [];
                const isbn = industryIdentifiers.find((identifier: any) => identifier.type === 'ISBN_13')?.identifier || 'ISBN non disponibile';

                return {
                    title: volumeInfo.title || 'Titolo non disponibile',
                    author: volumeInfo.authors || ['Autore/i non disponibile'],
                    isbn: isbn,
                    publishYear: volumeInfo.publishedDate || 'Data di pubblicazione non disponibile',
                    description: volumeInfo.description || 'Descrizione non disponibile',
                    language: volumeInfo.language || 'Lingua non disponibile',
                    genres: volumeInfo.categories || ['Genere non disponibile'],
                    image: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'Nessuna immagine disponibile',
                    previewLink: volumeInfo.previewLink || 'Anteprima non disponibile',
                    infoLink: volumeInfo.infoLink || 'Informazioni non disponibili',
                };
            });

            // Seleziona casualmente un sottoinsieme dei libri ottenuti
            return this.shuffleArray(libri).slice(0, 20);
        } catch (errore) {
            console.error('Errore durante la ricerca dei libri:', errore);
            return [];
        }
    }

    // Funzione per mescolare casualmente un array
    private shuffleArray(array: any[]): any[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

export default bookScraper;
