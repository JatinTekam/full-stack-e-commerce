import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import {Provider} from 'react-redux'
import { store } from '../store/store'
import { MySearchContext } from '../ProductContext/ProductContext'
const Applayout = () => {
  return (
    <>
   <MySearchContext>
    <Provider store={store}>
    <Header/>
    <Outlet/>
    <Footer/>
    </Provider>
    </MySearchContext>
    </>
  )
}

export default Applayout