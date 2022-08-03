import React, { FC, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore, STATE_CHANGED, storage } from '../lib/firebase';
import { useGetAuthUserData } from '../lib/hooks';
import Card from './Dummies/Card';
import EditForm from './Dummies/EditForm';
import './EditWindow.scss'
 const EditWindow:FC = () => {
    const [user] = useAuthState(auth);
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [description, setDescription] = useState('')
    const [downloadURL, setDownloadURL] = useState('')
    
    const myData = useGetAuthUserData(auth.currentUser.uid)

    useEffect(()=>{
      console.log(myData)
      setName(myData?.firstname)
      setAge(myData?.age)
      setDescription(myData?.description)
      setDownloadURL(myData?.photoURL)
    },[JSON.stringify(myData)])

    const handleSubmit = async(e:any) =>{
      e.preventDefault()
      console.log(e)
      const ref = firestore.collection('users').doc(user?.uid)
      await ref.update({
        firstname:name,
        age:age,
        description:description,
        photoURL: downloadURL,
      })
    }
    const handleChange = (e:any)=>{
        switch(e.target.name){
            case 'name': setName(e.target.value); break;
            case 'description': setDescription(e.target.value); break;
            case 'age' : setAge(e.target.value); break;
        }
        console.log(name)
    }
    const uploadFile = async (e:any)=>{
      const file = Array.from(e.target.files)[0]
      const ext = (file as any).type.split('/')[1]
      console.log(file)
      const ref = storage.ref(`uploads/${auth.currentUser.uid}/${Date.now()}.${ext}`)
      const task = ref.put(file as any);
  
      task.on(STATE_CHANGED, (snapshot) => {
        task
          .then((d) => ref.getDownloadURL())
          .then((url) => {
            setDownloadURL(url);
          });
      });
    }
  return (
    <div className='formandpreview'>
      <EditForm onClick={handleSubmit} onChange={handleChange} upLoadHandler={uploadFile}
        name={name} age={age}  description={description} photoURL={downloadURL}
      />
      <Card username={name} userage={age} avatar={downloadURL} />
    </div>
  )
}
export default EditWindow
