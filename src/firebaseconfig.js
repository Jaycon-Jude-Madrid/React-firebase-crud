import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBYQtTWJa4za8uOX2SpV93StnxJPuucQVs",
    authDomain: "react-crud-c87f7.firebaseapp.com",
    projectId: "react-crud-c87f7",
    storageBucket: "react-crud-c87f7.appspot.com",
    messagingSenderId: "62452108203",
    appId: "1:62452108203:web:4b4c95f9054b47cff7a0ee",
    measurementId: "G-E860Y8H6R8"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);