import { FC, useEffect, useState, useRef, } from "react"
import { arrayUnion, auth, firestore  } from "../lib/firebase"
import TextareaAutosize from '@mui/base/TextareaAutosize';

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
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const messagesRef = useRef<HTMLDivElement>(null)
    const prevMessagesRef = useRef<any>([])
    useEffect(()=>{
        prevMessagesRef.current = messages
        const chatRef1 = firestore.doc(`chats/${props.uid}-X-${auth.currentUser.uid}`)
        const chatRef2 = firestore.doc(`chats/${auth.currentUser.uid}-X-${props.uid}`)
        const unsub1 = chatRef1.onSnapshot((snapshot)=>{
            snapshot.exists && prevMessagesRef.current.length!==snapshot?.data()?.messages.length && setMessages(snapshot?.data()?.messages) 
        })
        const unsub2 = chatRef2.onSnapshot((snapshot)=>{
            snapshot.exists && prevMessagesRef.current.length!==snapshot?.data()?.messages.length && setMessages(snapshot?.data()?.messages) 
        })
        if(messagesEndRef.current){
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        } 
        console.log(1)
        
        return unsub1 
    },[props.uid, messages])
   

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
        setInput('')
        
        
    }
  return (
    <div className="chatwincontainer">
        <div className="head">
            <button className="goback" onClick={props.onClick}>👈</button>
            <img src={props.avatar} alt=''/>
            <h1>{props.username}</h1>
        </div>
        <div className="messagescontainer" ref={messagesRef}>
            {messages.map((message,i) => {return(
             <>
                <SingleMessage uid={message.sender} content={message.content} date={message.createdAt}/>
             </>
            )})}
            <div></div>
            <div ref={messagesEndRef} />
        </div>
        <div className="messagebox">
            <form onSubmit={handleSubmitMessage}>
                <TextareaAutosize maxRows={5} className='textarea' value={input} onChange={(e:any)=>{setInput(e.target.value);console.log(input)}} required />
                <button type="submit"> <p>✍️</p> </button>
            </form>
        </div>
    </div>
  )
}

function SingleMessage(props:any){
    return(
        <>
        {props.uid===auth.currentUser.uid && <div style={{alignSelf : 'flex-end'}} className="msgcontainer1">
            <p className="content">{props.content}</p>
            <p className="datetime">{new Date(props.date).toLocaleTimeString('ru')} / {new Date(props.date).toLocaleDateString('ru')}</p>
        </div>}
        {props.uid!==auth.currentUser.uid&&<div style={{alignSelf : 'flex-start'}} className="msgcontainer2">
            <p className="content">{props.content}</p>
            <p className="datetime">{new Date(props.date).toLocaleTimeString('ru')} / {new Date(props.date).toLocaleDateString('ru')}</p>
        </div>}
        </>
    )
}
export default ChatWindow
