import { signOut } from "firebase/auth"
import { useContext } from "react"

import { auth } from "../../../firebase"
import AuthContext from "../../context/AuthContext"

import style from './Header.module.css'

export function Header() {

    const { currentUser } = useContext(AuthContext);

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <header className={style.header}>
            <h1>To Do List</h1>
            
            {currentUser? (
            <div className={style.profileBox}>
            <div className={style.profile}> 
                <img 
                className={style.avatar} 
                src={currentUser?.photoURL} 
                alt="" />
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