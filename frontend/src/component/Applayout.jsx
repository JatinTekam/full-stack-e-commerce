
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Cart from '../Pages/Cart'
import { MySearchContext } from '../context/ProductContext/ProductContext'

const Applayout = () => {
  return (
    <MySearchContext>
      <main>
      <Header />
        <Outlet />
      <Footer />
      <Cart/>
      </main>
    </MySearchContext>
  )
}

export default Applayout