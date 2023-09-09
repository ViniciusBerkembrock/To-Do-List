import { signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "../../../firebase"
import { useNavigate } from "react-router-dom";

export function LoginPage() {

    const navigate = useNavigate()

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/toDoList')
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
        <div>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
            
            <button onClick={logout}>Sign Out</button>
        </div>
    )
}