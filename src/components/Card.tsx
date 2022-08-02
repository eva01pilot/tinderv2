import React, { ButtonHTMLAttributes, Children, FC } from "react";
import { JsxElement } from "typescript";

import './Card.scss'

interface userprops {
    data: string,
    username:string,
    userage:number,
    userdescription:string,
    usergender:string,
    avatar:string,
    onClick:any
  }

   export interface actionbutton extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
    data:string,
    value:string
  }
const Card:FC<userprops> = (props) =>{
    return(
        <div className="cardcontainer">
            <img src={props.avatar} alt="user avatar"></img>
            <h1>{props.username}, {props.userage}</h1>
            <div className="buttonscontainer">
                <ActionButton data={props.data} value='pass' onClick={props.onClick}>😶</ActionButton>
                <ActionButton data={props.data} value='info' onClick={props.onClick}>ℹ️</ActionButton>
                <ActionButton data={props.data} value='like' onClick={props.onClick}>❤️</ActionButton>
            </div>
        </div>
    )
}
const ActionButton:FC<actionbutton> = ({children,...rest}) =>{
    return(
        <button {...rest} className="actionbtn">{children}</button>
    )
}
export default Card
