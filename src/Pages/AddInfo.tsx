import React, { FC, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore, STATE_CHANGED, storage } from '../lib/firebase'

import './AddInfo.scss'

const AddInfo:FC = () => {
    const [user] = useAuthState(auth);
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [gender, setGender] = useState('male')
    const [description, setDescription] = useState('')
    const [downloadURL, setDownloadURL] = useState('')
    

    const handleSubmit = async(e:any) =>{
      e.preventDefault()
      const ref = firestore.collection('users').doc(user?.uid)
      await ref.set({
        uid:auth.currentUser.uid,
        firstname:name,
        age:age,
        gender: gender,
        description:description,
        photoURL: downloadURL,
        likes:[],
        matches:[]
      })
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
    <div className="formscreen">
      <div className="formcontainer">
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Введите ваше имя</label>
            <input id='name' type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setName((e.target as HTMLInputElement).value)}required/>
            <label htmlFor='age'>Введите ваш возраст</label>
            <input id='age' type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setAge(parseInt((e.target as HTMLInputElement).value))}required/>
            <div className='GenderContainer'>
               <div className="radiogroup">
                  <input required type="radio" id='male' name='gender' value="male" onChange={(e)=>setGender(e.target.value)}/>
                  <label htmlFor='male'>М</label>
                </div>
                <div className="radiogroup">
                  <label htmlFor='female'>Ж</label>
                  <input required  type="radio" id='female' name='gender' value="female" onChange={(e)=>setGender(e.target.value)}/>
                </div>
            </div>
            <label htmlFor='description'>Расскажите о себе</label>
            <textarea maxLength={150} id='description' onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>setDescription((e.target as HTMLTextAreaElement).value)} required/>
            <label className='InputFile'>
                📸 Загрузите фотографию
            <input  type="file" required accept="image/x-png,image/gif,image/jpeg, image/*" onChange={uploadFile} />
            </label>
            <button type="submit">Сохранить</button>
            <h1>{downloadURL}</h1>
      </form>
    </div>
  </div>
  )
}


export default AddInfo