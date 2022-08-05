import React, { FC } from "react";
import { motion } from "framer-motion"

import './Card.scss'

interface userprops {
    data?: string,
    username:string,
    userage:number,
    userdescription?:string,
    usergender?:string,
    avatar:string,
    onClick?:any,
    isVisible?:boolean
  }

   export interface actionbutton extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
    data:string,
    value:string
  }
const Card:FC<userprops> = (props) =>{
    return(
        <>
            {props.isVisible && <motion.div className="cardcontainer"
            exit={{ transform: `translate(200px)` }}
            >
                <img src={props.avatar} alt="user avatar"></img>
                <h1>{props.username}, {props.userage}</h1>
                <div className="buttonscontainer">
                    <ActionButton data={props.data as any} value='pass' onClick={props.onClick}>😶</ActionButton>
                    <ActionButton data={props.data as any} value='info' onClick={props.onClick}>ℹ️</ActionButton>
                    <ActionButton data={props.data as any} value='like' onClick={props.onClick}>❤️</ActionButton>
                </div>
            </motion.div>}
        </>
    )
}
const ActionButton:FC<actionbutton> = ({children,...rest}) =>{
    return(
        <button {...rest} className="actionbtn">{children}</button>
    )
}
export default Card
