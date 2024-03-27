
interface Book {
    title: string;
    isbn: string;
    author: string;
    publishYear: string;
    genres: string[];
    description: string | null;
    longDescription: string | null;
    language: string;
    image: string;
    // previewLink: string;
    // infoLink: string;
}

export default Book;
