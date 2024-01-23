import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth'; // Corrected import
import { getStorage } from 'firebase/storage'; // Corrected import
const firebaseConfig = {
    apiKey: "AIzaSyCuaSR4615QdheoEHK5SDZQX9k1R91vFd0",
    authDomain: "chat-app-react-5d4b4.firebaseapp.com",
    projectId: "chat-app-react-5d4b4",
    storageBucket: "chat-app-react-5d4b4.appspot.com",
    messagingSenderId: "961509992115",
    appId: "1:961509992115:web:a5e2d6bc7bb5db64ac32c6"
};

// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = firebase.firestore();
export const storage = getStorage(app);
export default app;