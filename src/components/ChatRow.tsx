import React, { FC, useEffect, useState } from 'react'
import { auth, firestore } from '../lib/firebase'

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
        <h4>{props.username}</h4>
    </div>
  )
}
export default  ChatRow