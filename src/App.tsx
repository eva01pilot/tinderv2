import React, { FC, useState, useEffect, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from './lib/firebase';

import './App.css';
import { UserContext } from './lib/context';
import Main from './Main';

const App:FC=()=> {
  const [user]:any = useAuthState(auth)
  const [username, setUsername]:any = useState(null)
  useEffect(()=>{
    let unsubscribe
    if (user){
      const ref = firestore.collection('users').doc(user.uid)
      unsubscribe = ref.onSnapshot((doc)=>{
        setUsername(doc.data()?.firstname)
      })
    } else {
      setUsername(null)
    }
    return unsubscribe
  },[user])
  return (
    <UserContext.Provider value={{user,username}}>
      <Main/>
    </UserContext.Provider>
  );
}
export default App;
