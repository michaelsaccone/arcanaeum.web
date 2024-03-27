import Book from "@/models/Book";

interface LoggedUser {
    name: string;
    email: string;
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
    books: Array<Book>
}

export default LoggedUser;
