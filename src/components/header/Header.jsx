import { signOut } from "firebase/auth"
import { useContext, useEffect } from "react"

import { auth } from "../../../firebase"
import AuthContext from "../../context/AuthContext"
import useSetStatusUser from "../../hooks/useSetStatusUser/useSetStatusUser"

import style from './Header.module.css'

export function Header() {

    const { currentUser } = useContext(AuthContext);
    const { setStatusUser} = useSetStatusUser();

    useEffect(() => {
        const handleBeforeUnload = async () => {
           await setStatusUser(false);
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, [setStatusUser]);

    const logout = async () => {
        try {
            setStatusUser(false)
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <header className={style.header}>
            <h1>TO DO LIST</h1>
            
            {currentUser? (
            <div className={style.profileBox}>
            <div className={style.profile}> 
                <img 
                className={style.avatar} 
                src={currentUser?.photoURL} 
                alt="Avatar" />
            </div>
            <span className={style.profileName}>{currentUser?.displayName}</span>
            <button className={style.logout} onClick={logout}>Logout</button>
        </div>
            ) : (
                <span></span>
            )}

        </header>
    )
}   