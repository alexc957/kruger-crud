import { initializeApp ,FirebaseOptions, FirebaseApp} from "firebase/app";


const firebaseConfig:FirebaseOptions = {  // this should be in a .env file

    apiKey: "AIzaSyBx5QzeeyOxKtU0eF_Co6jo68rtWhD2-2A",
  
    authDomain: "krugre-crud.firebaseapp.com",
  
    projectId: "krugre-crud",
  
    storageBucket: "krugre-crud.appspot.com",
  
    messagingSenderId: "903556253441",
  
    appId: "1:903556253441:web:b5d8bdbd1d2614955a7d00",
  
    measurementId: "G-71WTH6N405",
    databaseURL: "https://krugre-crud-default-rtdb.firebaseio.com/"
  
  };
  
  
  // Initialize Firebase
  
  const app:FirebaseApp = initializeApp(firebaseConfig);
  export default app; 

  
 