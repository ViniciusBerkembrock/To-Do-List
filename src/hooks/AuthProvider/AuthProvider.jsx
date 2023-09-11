import { useEffect, useState } from 'react'

import { auth } from '../../../firebase';
import AuthContext from "../../context/AuthContext";
import useSetStatusUser from '../useSetStatusUser/useSetStatusUser';

export const AuthProvider = ({ children }) => {

    const { setStatusUser} = useSetStatusUser();
    
    const [currentUser, setCurrentUser ] = useState(null);
   
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
              setCurrentUser(user);   
              setStatusUser(true);      
        })
    });

    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

