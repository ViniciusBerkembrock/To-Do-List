import { useEffect, useState } from 'react'
import { getDocs, getDoc, collection, addDoc, doc, deleteDoc, onSnapshot, updateDoc, query, where } from "firebase/firestore";

import { auth } from '../../../../firebase';
import AuthContext from "../../../context/AuthContext";
import { db } from "../../../../firebase"

export const AuthProvider = ({ children }) => {

    const userCollectionRef = collection(db, "users");
    
    const [userList, setUserList ] = useState(null);

    const [currentUser, setCurrentUser ] = useState(null);

    useEffect(() => {

        const unsubscribe = onSnapshot(userCollectionRef, (snapshot) => {
          const updatedMovies = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setUserList(updatedMovies);
        });
    
        return () => unsubscribe();
    }, []);
    
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
              setCurrentUser(user);   
              
              if (auth.currentUser && userList != null){
                    const usuario = userList.find((item) => item.email === auth.currentUser.email);
                    console.log(usuario)
                    const usuarioDoc = doc(db, "users", usuario.id);
                    await updateDoc(usuarioDoc, {online: true})
              }       

                           
        })

    });

    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

