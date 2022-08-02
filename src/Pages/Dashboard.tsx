import { useState, useEffect } from 'react'
import Card  from '../components/Card';
import { arrayUnion, auth, firestore } from '../lib/firebase'

import './Dashboard.scss'

function Dashboard() {

  interface looseobject{
    [key:string]:any
  }

  const [userArray, setUserArray]:Array<any> = useState([])
  const [chatsArray, setChatsArray]:Array<any> = useState([])

  useEffect(()=>{
    const ref=firestore.collection('users').where('uid', '!=', auth.currentUser.uid)
    ref.get().then(snapshot=>setUserArray(snapshot.docs.map(doc=>doc.data())))

    const refMyChatsOne = firestore.collection('chats').where('user1', '==', auth.currentUser.uid)
    const refMyChatsTwo = firestore.collection('chats').where('user2', '==', auth.currentUser.uid)
    const unsub = refMyChatsOne.onSnapshot(
      (snapshot1)=>{
        refMyChatsTwo.onSnapshot((snapshot2)=>{
          setChatsArray([...snapshot1.docs.map(doc => doc.data()) , ...snapshot2.docs.map(doc => doc.data())])
        })
      }
      )
    return unsub
  },[])
  
  const handleClick = async(e:any) =>{
    const val = e.target.value
    e.preventDefault()
    
    switch(val){
      case 'like':{
        const refMe = firestore.collection('users').doc(auth.currentUser.uid)
        const refTarget = firestore.collection('users').doc(e.target.getAttribute('data'))
        refMe.update({
          likes:arrayUnion(e.target.getAttribute('data'))
        })

        const Userliked = (await refTarget.get()).data()?.likes
        Userliked.indexOf(auth.currentUser.uid)!==-1 && (()=>{
          refMe.update({
            matches: arrayUnion(e.target.getAttribute('data'))
          })
          refTarget.update({
            matches: arrayUnion(auth.currentUser.uid)
          })
          const newChatRef = firestore.collection('chats').doc(auth.currentUser.uid+'-X-'+e.target.getAttribute('data'))
          newChatRef.set({
            user1: auth.currentUser.uid,
            user2: e.target.getAttribute('data'),
            messages:{}
          })
        })()
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
        {chatsArray.map((chat:looseobject,i:number)=>{
          return(
            <>
              <h1 key={i}> {chat?.user1}, {chat?.user2}</h1>
            </>
          )
        })}
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