import React, { FC } from 'react'
import './EditForm.scss'

interface formtypes{
    onClick:(e:any)=>Promise<void>,
    onChange:(e:any)=>void,
    upLoadHandler:(e:any)=>void,
    name:string,
    age:number,
    description:string,
    photoURL:string

}


const EditForm:FC<formtypes> = ({onClick, onChange, upLoadHandler, ...rest}) => {
    
  return (
    <div className="formeditscreen">
      <div className="formcontainer">
        <form >
            <label htmlFor='name'>Введите ваше имя</label>
            <input value={rest.name} name='name' id='name' type="text" onChange={onChange}required/>
            <label htmlFor='age'>Введите ваш возраст</label>
            <input value={rest.age} name='age' id='age' type="text" onChange={onChange}required/>
            <label htmlFor='description'>Расскажите о себе</label>
            <textarea value={rest.description} name='description' maxLength={150} id='description' onChange={onChange} required/>
            <label className='InputFile'>
                📸 Загрузите фотографию
            <input  name='upload' type="file" required accept="image/x-png,image/gif,image/jpeg, image/*" onChange={upLoadHandler} />
            </label>
            <button onClick={onClick} type="submit">Сохранить</button>
      </form>
    </div>
  </div>
  )
}


export default EditForm