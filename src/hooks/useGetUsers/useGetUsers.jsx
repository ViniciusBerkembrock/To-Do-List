import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../../../firebase"

const useGetUsers = () => {

    const userCollectionRef = collection(db, "users");

    const [userList, setUserList] = useState([]);

        useEffect(() => {

            const unsubscribe = onSnapshot(userCollectionRef, (snapshot) => {
              const users = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }));
              setUserList(users);
            });
        
            return () => unsubscribe();
        }, []);

    return{
      userList
    }
}



export default useGetUsers