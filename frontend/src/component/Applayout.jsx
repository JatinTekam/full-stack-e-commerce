
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Cart from '../Pages/Cart'
import { MySearchContext } from '../context/ProductContext/ProductContext'
import ProductBuy from '../Pages/ProductBuy'

const Applayout = () => {
  return (
    <MySearchContext>
      <main>
      <Header />
        <Outlet />
      <Footer />
      <Cart/>
      {/* <ProductBuy/> */}
      </main>
    </MySearchContext>
  )
}

export default Applayout