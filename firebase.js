import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCvZZFQsEwWPFIc4o5n5DnC79_eTFDmbE4",
  authDomain: "to-do-list-2b043.firebaseapp.com",
  projectId: "to-do-list-2b043",
  storageBucket: "to-do-list-2b043.appspot.com",
  messagingSenderId: "382355352532",
  appId: "1:382355352532:web:83f2f415a8cbe99319c441"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);