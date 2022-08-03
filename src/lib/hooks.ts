import { useState } from "react";
import { firestore } from "./firebase"

export const useGetAuthUserData = (auth:any) =>{
    const [user, setUser] = useState<any>()
    const ref = firestore.doc(`users/${auth}`)
    ref.get().then(user => setUser(user.data()))
    return user

}