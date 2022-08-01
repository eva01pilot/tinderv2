import React, { FC, useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import Card, { actionbutton } from '../components/Card';
import { arrayUnion, auth, firestore } from '../lib/firebase'

import './Dashboard.scss'

function Dashboard() {

  interface looseobject{
    [key:string]:any
  }

  const [userArray, setUserArray]:Array<any> = useState([])

  useEffect(()=>{
    const ref=firestore.collection('users').where('uid', '!=', auth.currentUser.uid)
    ref.get().then(snapshot=>setUserArray(snapshot.docs.map(doc=>doc.data())))
    console.log(userArray)
  },[])
  
  const handleClick = async(e:any) =>{
    const val = e.target.value
    e.preventDefault()
    
    switch(val){
      case 'like':{
        const refMe = firestore.collection('users').doc(auth.currentUser.uid)
        const refTarget = firestore.collection('users').where('uid', '==', e.target.getAttribute('data'))
        refMe.update({
          likes:arrayUnion(e.target.getAttribute('data'))
        })
        refTarget.get().then((snapshot)=>{
          const matches=snapshot.docs[0].data().likes
        })
        const Userliked =  (await refTarget.get()).docs[0].data().likes
        Userliked.indexOf(auth.currentUser.uid)!==-1 && console.log('its a match!')
        
        }

        break;
      }
      let usrarr = [...userArray]
    usrarr=usrarr.filter((user)=>user.uid!==e.target.getAttribute('data'))
    setUserArray(usrarr) 
      }  
    
    
    
  

  return (
    <div className="dashboard">
      <div className="chats">

      </div>
      <div className="cards">
        <div className="cardscontainer">
        {userArray.map((user:looseobject)=>{
          return(
          <Card key={user?.uid}
            data={user?.uid} 
            username={user.firstname} 
            userage={user.age}
            usergender={user.gender} 
            avatar={user.photoURL}
            userdescription={user.description}
            onClick={handleClick}
            /> 
          )
        })}
        </div>
      </div>
    </div>

  )
}

export default Dashboard