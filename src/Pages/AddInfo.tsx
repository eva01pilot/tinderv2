import React, { FC, useState } from 'react'

import './AddInfo.scss'
const AddInfo:FC = () => {
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [gender, setGender] = useState('male')
    const [description, setDescription] = useState('')
  return (
    <div className="formcontainer">
        <form>
            <label htmlFor='name'>Введите ваше имя</label>
            <input id='name' type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setName((e.target as HTMLInputElement).value)}required/>
            <label htmlFor='age'>Введите ваш возраст</label>
            <input id='age' type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setAge(parseInt((e.target as HTMLInputElement).value))}required/>
            <div className='GenderContainer'>
                <label htmlFor='male'>Мужчина</label>
                <input required type="radio" id='male' name='gender' value="male" onChange={(e)=>setGender(e.target.value)}/>
                <label htmlFor='female'>Женщина</label>
                <input required  type="radio" id='female' name='gender' value="female" onChange={(e)=>setGender(e.target.value)}/>
            </div>
            <label htmlFor='description'>Расскажите о себе</label>
            <textarea maxLength={150} id='description' onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>setDescription((e.target as HTMLTextAreaElement).value)} required/>
            <label>
                📸 Загрузите фотографию
            <input  type="file"  accept="image/x-png,image/gif,image/jpeg" />
            </label>
            <button type="submit">Сохранить</button>
    </form>
    </div>
  )
}

AddInfo.propTypes = {}

export default AddInfo