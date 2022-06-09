import { FirebaseApp } from "firebase/app";

import { getDatabase, ref, child, get, onValue, DataSnapshot, set, Unsubscribe } from "firebase/database";
import { Employee } from "../interfaces/Employee";
import { KrugerUser } from "../interfaces/User";
const database = getDatabase();
const dbRef = ref(database);



export const getUser = (uid: string, app: FirebaseApp): Promise<DataSnapshot> => {

    return get(child(dbRef, `users/${uid}`));

}

export const addUser = (uid: string, user:KrugerUser):Promise<void> => {
  return set(ref(database, "users/"+uid), user);
}

export const addEmployee =(cedula: string, employee:Employee):Promise<void> => {

  return  set(ref(database, "employees/"+cedula),employee);
}

export const listenEmployees = (setData: Function):Unsubscribe  => {

  return onValue(ref(database,"employees"),(snapshot: DataSnapshot)=> {
    if(snapshot.exists()){
      setData(Object.values(snapshot.val()));
    }
  })

}