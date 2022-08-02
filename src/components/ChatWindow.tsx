import { FC, useEffect, useState } from "react"
import { arrayUnion, auth, firestore, serverTimestamp } from "../lib/firebase"

import './ChatWindow.scss'
interface chatwintypes{
    uid:string,
    username:string,
    avatar:string,
    onClick:any
}

 const ChatWindow:FC<chatwintypes> = (props) => {
    const [messages, setMessages] = useState<Array<any>>([])
    const [input, setInput] = useState('')
    useEffect(()=>{
        const chatRef1 = firestore.doc(`chats/${props.uid}-X-${auth.currentUser.uid}`)
        const chatRef2 = firestore.doc(`chats/${auth.currentUser.uid}-X-${props.uid}`)
        const unsub1 = chatRef1.onSnapshot((snapshot)=>{
            snapshot.exists && setMessages(snapshot?.data()?.messages) 
        })
        const unsub2 = chatRef2.onSnapshot((snapshot)=>{
            snapshot.exists && setMessages(snapshot?.data()?.messages) 
        })
        return unsub1 
    },[props.uid])

    const handleSubmitMessage = (e:any) =>{
        e.preventDefault()
        const chatRef1 = firestore.doc(`chats/${props.uid}-X-${auth.currentUser.uid}`)
        const chatRef2 = firestore.doc(`chats/${auth.currentUser.uid}-X-${props.uid}`)
        chatRef1.get().then((res)=>{
            res.exists && chatRef1.update({
                messages: arrayUnion({
                    sender: auth.currentUser.uid,
                    content: input,
                    createdAt: new Date().getTime()
                })
            })
        })
        chatRef2.get().then((res)=>{
            res.exists && chatRef2.update({
                messages: arrayUnion({
                    sender: auth.currentUser.uid,
                    content: input,
                    createdAt: new Date().getTime()
                })
            })
        })
    }
  return (
    <div className="chatwincontainer">
        <div className="head">
            <button className="goback" onClick={props.onClick}>👈</button>
            <img src={props.avatar} alt=''/>
            <h1>{props.username}</h1>
        </div>
        <div className="messagescontainer">
            {messages.map((message,i) => {return(
             <>
                <SingleMessage uid={message.sender} content={message.content}/>
             </>
            )})}
        </div>
        <div className="messagebox">
            <form onSubmit={handleSubmitMessage}>
                <textarea value={input} onChange={(e)=>{setInput(e.target.value);console.log(input)}} required className="messagebox"/>
                <button type="submit"> Отправить сообщение </button>
            </form>
        </div>
    </div>
  )
}

function SingleMessage(props:any){
    return(
        <>
        {props.uid===auth.currentUser.uid && <div style={{alignSelf : 'flex-end'}} className="msgcontainer">
            <p>{props.content}</p>
        </div>}
        {props.uid!==auth.currentUser.uid&&<div style={{alignSelf : 'flex-start'}} className="msgcontainer">
        <p>{props.content}</p>
        
        </div>}
        </>
    )
}
export default ChatWindow
