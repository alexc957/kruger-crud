import logo from "./logo.svg";
import {
  Box,
  Image,
  Text,
  Link,
  HStack,
  Heading,
  Switch,
  useColorMode,
  VStack,
  
} from "native-base";
import app from './firebase/firebase';
import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getUser } from "./firebase/services";
import Login from "./components/Login";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import { KrugerUser } from "./interfaces/User";
import AdminDashboard from "./components/admin/AdminDashboard";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";



const auth = getAuth(app)

export default function App() {

  const [user, setUser] = useState<KrugerUser | null>(null);

  useEffect(()=> {
    const authState = onAuthStateChanged(auth, async (user:User | null)=> {
      if(user){
        const uid = user.uid;
        const currentUser = await getUser(uid, app);
        setUser(currentUser.val())
      }
    });

    return authState;
  },[]);

  const renderOnUser = () => {
    if(!user){
      return <Login />
    }
    if(user.role==="admin"){
      return  <AdminDashboard />

    }
    return <EmployeeDashboard/>
  }


  return (
  
   <FirebaseProvider value={app}>
      {renderOnUser()}
   </FirebaseProvider>
  );
}

