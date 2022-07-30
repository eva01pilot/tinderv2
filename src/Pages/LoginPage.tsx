import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore, googleAuthProvider } from '../lib/firebase'

function LoginPage() {
  const [user] = useAuthState(auth);
  const handleLogin = async() =>{
    await auth.signInWithPopup(googleAuthProvider)
    const ref = firestore.collection('users').doc(user?.uid)
    await ref.set({uid:auth.currentUser.uid})  
  }
  return (
    <>
      <button onClick={handleLogin}>Sign In With Google</button>
    </>
  )
}

export default LoginPage