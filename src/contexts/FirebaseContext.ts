import { FirebaseApp } from "firebase/app";
import { createContext } from "react";


const FirebaseContext = createContext<FirebaseApp | undefined>(undefined);

export const FirebaseProvider = FirebaseContext.Provider;
export default FirebaseContext;