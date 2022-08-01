import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore, googleAuthProvider } from '../lib/firebase'

function LoginPage() {
  const [user] = useAuthState(auth);

  const handleLogin = async() =>{
    await auth.signInWithPopup(googleAuthProvider)
  }
  return (
    <>
      <button onClick={handleLogin}>Sign In With Google</button>
    </>
  )
}

export default LoginPage