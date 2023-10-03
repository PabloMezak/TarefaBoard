
// Importação do fireBase Bando de dados
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
// Configs da configuração web do firebase
const firebaseConfig = {
  apiKey: "AIzaSyA8lif1MySTJuSjBB2kzSqf_d3u-9muNb0",
  authDomain: "taskplus-68b16.firebaseapp.com",
  projectId: "taskplus-68b16",
  storageBucket: "taskplus-68b16.appspot.com",
  messagingSenderId: "438775254249",
  appId: "1:438775254249:web:c9f79ed5ab9fb8b3f5b478"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Configuração bando de dados usando as configurações do (firebaseConfig)
const db = getFirestore(firebaseApp)

export {db}