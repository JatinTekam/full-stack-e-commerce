import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import {Provider} from 'react-redux'
import { store } from '../store/store'
import { MySearchContext } from '../ProductContext/ProductContext'
import Cart from '../Pages/Cart'
const Applayout = () => {
  return (
    <>
   <MySearchContext>
    <Header/>
    <Outlet/>
    <Footer/>
    <Cart/>
    </MySearchContext>
    </>
  )
}

export default Applayout