import  { FC } from 'react'

import './ChatRow.scss'

interface chatprops {
    username:string,
    avatar:string,
    uid:string,
    onClick:any
  }

const ChatRow:FC<chatprops> = (props) => {
    
  return (
    <div className="chatrowcontainer" onClick={props.onClick}>
        <img src={props.avatar} alt='user avatar'/>
        <h3>{props.username}</h3>
    </div>
  )
}
export default  ChatRow