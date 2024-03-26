import Book from "@/models/Book";

const inputRicerca = document.getElementById('inputRicerca');
const risultatiRicercaDiv = document.getElementById('risultatiRicerca');

inputRicerca.addEventListener('input', async function() {
    const cerca = inputRicerca.innerHTML.trim();
    risultatiRicercaDiv.innerHTML = '';
    if (cerca.length === 0) {
        return;
    }

    cercaLibriFinale(cerca);
});

async function cercaLibriFinale(cerca:string) {
    const ricercaISBN = await cercaLibri(cerca, 'isbn');
    if(ricercaISBN.length < 1){
        const ricercaTitolo = await cercaLibri(cerca, 'intitle');
        const ricercaAutore = await cercaLibri(cerca, 'inauthor');
        let ricercaFinale = await null;
        if (ricercaAutore.length <= 2) {
            ricercaFinale = ricercaTitolo.slice(0, 5 - ricercaAutore.length).concat(ricercaAutore);
        }else{
            ricercaFinale = ricercaFinale = ricercaTitolo.slice(0, 3).concat(ricercaAutore.slice(0, 2));
            console.log("Titolo: " + JSON.stringify(ricercaTitolo) + "\n\n\nAutore: " + JSON.stringify(ricercaAutore) + "\n\n\nFinale: " + JSON.stringify(ricercaFinale));
        }
        return ricercaFinale;
    }else{
        return ricercaISBN;
    }
}


async function cercaLibri(cerca, ricercaDa) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${ricercaDa}:${cerca}&maxResults=5`;

    try {
        const risposta = await fetch(url);
        const data = await risposta.json();

        if (!data || data.totalItems === 0) {
            return [];
        }
        console.log(data);
        const libri: Array<Book> = data.items.map(libro => {
            const volumeInfo = libro.volumeInfo;
            return {
                titolo: volumeInfo.title || 'Titolo non disponibile',
                autori: volumeInfo.authors || ['Autore/i non disponibile'],
                editore: volumeInfo.publisher || 'Editore non disponibile',
                isbn: volumeInfo.industryIdentifiers ? volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_13').identifier : 'ISBN non disponibile',
                dataPubblicazione: volumeInfo.publishedDate || 'Data di pubblicazione non disponibile',
                descrizione: volumeInfo.description || 'Descrizione non disponibile',
                lingua: volumeInfo.language || 'Lingua non disponibile',
                genere: volumeInfo.categories || ['Genere non disponibile'], // Ottenere il genere del libro
                immagineMiniatura: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'Nessuna immagine disponibile',
                linkAnteprima: volumeInfo.previewLink || 'Anteprima non disponibile',
                linkInfo: volumeInfo.infoLink || 'Informazioni non disponibili',
            };
        });

        return libri;
    } catch (errore) {
        console.error('Errore durante la ricerca dei libri:', errore);
    }
}

function visualizzaRisultati(libri, titolo) {
    let html = `<h2>${titolo}</h2>`;
    if (libri.length === 0) {
        html += '<p>Nessun risultato trovato.</p>';
    } else {
        html += '<ul>';
        libri.forEach(libro => {
            html += `
                        <li>
                            <strong>Titolo:</strong> ${libro.titolo}<br>
                            <strong>Autore/i:</strong> ${libro.autori.join(', ')}<br>
                            <strong>Sottotitolo:</strong> ${libro.sottotitolo}<br>
                            <strong>Editore:</strong> ${libro.editore}<br>
                            <strong>Data di pubblicazione:</strong> ${libro.dataPubblicazione}<br>
                            <strong>Descrizione:</strong> ${libro.descrizione}<br>
                            <strong>Numero di pagine:</strong> ${libro.pagine}<br>
                            <strong>Lingua:</strong> ${libro.lingua}<br>
                            <strong>Generi:</strong> ${libro.genere}<br>
                            <strong>Immagine Miniatura:</strong> <img src="${libro.immagineMiniatura}"><br>
                            <strong>Immagini:</strong> ${JSON.stringify(libro.immagini)}<br>
                            <strong>Link Anteprima:</strong> <a href="${libro.linkAnteprima}" target="_blank">Anteprima</a><br>
                            <strong>Link Info:</strong> <a href="${libro.linkInfo}" target="_blank">Info</a><br>
                            <strong>Link Vendita:</strong> <a href="${libro.linkVendita}" target="_blank">Acquista</a><br>
                        </li>
                    `;
        });
        html += '</ul>';
    }
    risultatiRicercaDiv.innerHTML += html;
}
