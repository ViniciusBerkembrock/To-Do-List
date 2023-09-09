import { signOut } from "firebase/auth"
import { auth } from "../../../firebase"
import styles from './Header.module.css'
import AuthContext from "../../context/AuthContext"
import { useContext, useEffect } from "react"

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
        <header className={styles.header}>
            <h1>To Do List</h1>

            <div>
                <img src={currentUser?.photoURL} alt="" />
                <span>{currentUser?.displayName}</span>
                <button onClick={logout}>Logout</button>
            </div>
        </header>
    )
}   