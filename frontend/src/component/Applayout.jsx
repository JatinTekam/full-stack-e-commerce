import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { MySearchContext } from '../Context/SearchContext'

const Applayout = () => {
  return (
    <>
    <MySearchContext>
    <Header/>
    <Outlet/>
    </MySearchContext>
    {/* <Footer/> */}
    </>
  )
}

export default Applayout