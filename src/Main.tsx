import React, { useContext } from 'react'
import { UserContext } from './lib/context';
import AddInfo from './Pages/AddInfo';

import Dashboard from './Pages/Dashboard';
import LoginPage from './Pages/LoginPage';
const Main = () => {
  const user = useContext(UserContext)
  return (
    <>
    {user.user?
      !user.username?<AddInfo/>:
      <Dashboard/>
    :<LoginPage/>}
    </>
  )
}

export default Main