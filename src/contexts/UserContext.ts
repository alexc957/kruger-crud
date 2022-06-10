import { createContext } from "react";
import { KrugerUser } from "../interfaces/User";


const UserContext = createContext<KrugerUser | null>({
    email: "",
    role: "",
    name: "",
});

export const UserProvder = UserContext.Provider;
export default UserContext;