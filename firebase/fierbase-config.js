import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTxHgGGKeRy8RWGWMwseB4rUhsWL_oKbA",
  authDomain: "joud-98138.firebaseapp.com",
  projectId: "joud-98138",
  storageBucket: "joud-98138.appspot.com",
  messagingSenderId: "332515043054",
  appId: "1:332515043054:web:6f83991f53f2c173b8f5ff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
