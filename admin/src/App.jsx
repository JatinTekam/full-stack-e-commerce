import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Heading from './component/Heading'
import UserOrders from './component/UserOrders'

function App() {


  return (
    <div className=''>
     <Heading/>
     <UserOrders/>
    </div>
  )
}

export default App
