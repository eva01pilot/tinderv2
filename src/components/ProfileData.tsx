import React, { FC } from 'react'
import './ProfileData.scss'
interface profiledataprops{
    user:any
}
 const ProfileData:FC<profiledataprops> = ({user}) => {
  return (
    <div className='controlpanel'>
        <img className='useravatar'src={user?.photoURL} alt=""/>
        <button className='edit'>В профиль</button>
        <button className='exit'>Выйти</button>
    </div>
  )
}

export default ProfileData
