import { FirebaseApp } from "firebase/app";
import { getDatabase, ref, child, get, onValue, DataSnapshot } from "firebase/database";




export const getUser = (uid: string, app: FirebaseApp): Promise<DataSnapshot> => {
    const database = getDatabase(app);
    const dbRef = ref(database);
    return get(child(dbRef, `users/${uid}`));

}