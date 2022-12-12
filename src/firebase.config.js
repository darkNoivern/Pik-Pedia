// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP7LhDNGqJVLlsIWLpMifqn-oEehvKCgg",
  authDomain: "pikapedia-c7d22.firebaseapp.com",
  projectId: "pikapedia-c7d22",
  storageBucket: "pikapedia-c7d22.appspot.com",
  messagingSenderId: "922165021760",
  appId: "1:922165021760:web:b847ed5c14ca0d99bae3a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };