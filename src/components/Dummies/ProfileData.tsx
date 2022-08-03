import React, { FC } from 'react'
import { auth } from '../../lib/firebase'
import './ProfileData.scss'
interface profiledataprops{
    user:any,
    onClick:()=>any,
    shown: boolean
}
 const ProfileData:FC<profiledataprops> = ({user, shown, onClick}) => {
  return (
    <div className='controlpanel'>
        <img className='useravatar'src={user?.photoURL} alt=""/>
        <button className='edit' onClick={onClick}>{
          shown?<h1>Назад</h1>:<h1>В профиль</h1>
        }</button>
        <button className='exit' onClick={()=>auth.signOut()}>Выйти</button>
    </div>
  )
}

export default ProfileData
