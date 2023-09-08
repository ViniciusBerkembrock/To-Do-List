import { signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "../../../firebase"

export function LoginPage() {

    const signInWithGoogle = async () => {
        try {
            signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    }

    const logout = async () => {
        try {
            signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }
    
    return(
        <div>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
            
            <button onClick={logout}>Sign Out</button>
        </div>
    )
}