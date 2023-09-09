import { signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "../../../firebase"
import { useNavigate  } from "react-router-dom";

import { GoogleLogo } from "phosphor-react";
import style from './LoginPage.module.css'

export function LoginPage() {

    const navigate = useNavigate()

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/toDoList");
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