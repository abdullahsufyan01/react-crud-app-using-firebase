// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: FIREBASE_API_KEY,
  // authDomain: FIREBASE_AUTH_DOMAIN,
  // projectId: FIREBASE_PROJECT_ID,
  // storageBucket: FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  // appId: FIREBASE_APP_ID
  apiKey: "AIzaSyAZ4L93TGsKxctRhnMLiiAYJxNNMKPS7Ow",
  authDomain: "react-crud-app-bf449.firebaseapp.com",
  projectId: "react-crud-app-bf449",
  storageBucket: "react-crud-app-bf449.appspot.com",
  messagingSenderId: "713055291360",
  appId: "1:713055291360:web:3a710b189eee2d4e060d85"
  
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);
const fireDb = getDatabase(fireApp);  

export const addContact = (contactData, callback) => {
  const contactsRef = ref(fireDb, 'contacts');
  push(contactsRef, contactData, callback);
};

export default fireDb;
