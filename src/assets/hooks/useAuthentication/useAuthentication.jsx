import { useEffect, useState } from 'react'

import { auth } from '../../../../firebase';
import AuthContext from "../../../context/AuthContext";

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser ] = useState(null);
    
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
        })
    })

    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}