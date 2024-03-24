import User from "@/models/User";

interface Family {
    secretCode: string;
    nickname: string;
    members: Array<User> | null;
}

export default Family;