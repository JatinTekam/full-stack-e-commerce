import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { MySearchContext } from "../ProductContext/ProductContext.jsx"

const Applayout = () => {
  return (
    <>
    <MySearchContext>
    <Header/>
    <Outlet/>
    <Footer/>
    </MySearchContext>
    
    </>
  )
}

export default Applayout