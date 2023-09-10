import { signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "../../../firebase"
import { useNavigate  } from "react-router-dom";

import { GoogleLogo } from "phosphor-react";
import style from './LoginPage.module.css'
import { getDocs, getDoc, collection, addDoc, doc, deleteDoc, onSnapshot, query, where, updateDoc, } from "firebase/firestore";

import { db } from "../../../firebase"
import { useState } from "react";

export function LoginPage() {

    const userCollectionRef = collection(db, "users");

    const [userList, setUserList] = useState([])

    const navigate = useNavigate()

    const signInWithGoogle = async () => {
        try {
          const result = await signInWithPopup(auth, googleProvider);
    
          const userQuery = query(collection(db, 'users'), where('email', '==', result.user.email));
          const userQuerySnapshot = await getDocs(userQuery);
        
          if (userQuerySnapshot.empty) {
            await addDoc(userCollectionRef, {
                name: result.user.displayName, 
                email: result.user.email, 
                online: true,
                photoURL: result.user.photoURL})
            navigate('/toDoList');
          } else {
            navigate('/toDoList');
          }
        } catch (err) {
          console.error(err);
        }
      }

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }
    
    return(
        <div className={style.display}>
            <button className={style.btnSignIn} onClick={signInWithGoogle}> <GoogleLogo/>Sign In With Google</button>
            
            <button className={style.btnSignOut} onClick={logout}>Sign Out</button>
        </div>
    )
}