import { useState, useEffect } from 'react'

import { arrayUnion, auth, firestore } from '../lib/firebase'

import Card  from '../components/Card';
import ChatRow from '../components/ChatRow';
import './Dashboard.scss'
import ChatWindow from '../components/ChatWindow';

function Dashboard() {

  interface looseobject{
    [key:string]:any
  }

  const [userArray, setUserArray] = useState<Array<any>>([])
  const [chatsArray, setChatsArray] = useState<Array<any>>([])
  const [chatShown, setChatShown] = useState<null|looseobject>(null)

  useEffect(()=>{
    const ref=firestore.collection('users').where('uid', '!=', auth.currentUser.uid)
    ref.get().then(snapshot=>setUserArray(snapshot.docs.map(doc=>doc.data())))
    
    const refMyChatsOne = firestore.collection('chats').where('user1.uid', '==', auth.currentUser.uid)
    const refMyChatsTwo = firestore.collection('chats').where('user2.uid', '==', auth.currentUser.uid)
    const unsub = refMyChatsOne.onSnapshot(
      (snapshot1)=>{
        refMyChatsTwo.onSnapshot((snapshot2)=>{
          setChatsArray([...snapshot1.docs.map(doc => doc.data()) , ...snapshot2.docs.map(doc => doc.data())])
        })
      }
      )
      console.log(chatShown)
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

        const me = (await refMe.get()).data()
        const targetUser = (await refTarget.get()).data()
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
            user1: me,
            user2: targetUser,
            messages:[]
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

           if (chat.user1.uid===auth.currentUser.uid){ return(
            <>
            <ChatRow onClick={()=>setChatShown(chat)} key={i} uid={chat.user2.uid} username={chat.user2.firstname} avatar={chat.user2.photoURL} />
            </>
          )}
            else{ return(
              <>
            <ChatRow onClick={()=>setChatShown(chat)} key={i} uid={chat.user1.uid} username={chat.user1.firstname} avatar={chat.user1.photoURL} />
              </>
            )
            }
        })}
      </div>
      <div className="cardsorchat">
        {!chatShown && <div className="cardscontainer">
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
        
        </div>}
        {chatShown?.user1.uid===auth.currentUser.uid && <ChatWindow onClick={()=>setChatShown(null)} uid={chatShown?.user2.uid} username={chatShown?.user2.firstname} avatar={chatShown?.user2.photoURL}/>}
        {chatShown?.user2.uid===auth.currentUser.uid && <ChatWindow onClick={()=>setChatShown(null)} uid={chatShown?.user1.uid} username={chatShown?.user1.firstname} avatar={chatShown?.user1.photoURL}/>}
      </div>
    </div>

  )
}

export default Dashboard