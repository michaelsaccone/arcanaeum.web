
interface LoggedUser {
    name: string;
    email: string;
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
}

export default LoggedUser;
