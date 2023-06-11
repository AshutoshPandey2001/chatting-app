import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCuaSR4615QdheoEHK5SDZQX9k1R91vFd0",
    authDomain: "chat-app-react-5d4b4.firebaseapp.com",
    projectId: "chat-app-react-5d4b4",
    storageBucket: "chat-app-react-5d4b4.appspot.com",
    messagingSenderId: "961509992115",
    appId: "1:961509992115:web:a5e2d6bc7bb5db64ac32c6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
