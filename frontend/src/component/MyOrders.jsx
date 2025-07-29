import React, { useState } from 'react'
import img7 from "../assets/images/img7.jpg";
import { useSelector } from 'react-redux';
import cartGif from "../assets/images/emptyCart.gif"
import UserOrderedProducts from './UserOrderedProducts';


const MyOrders = () => {

  const {orders}=useSelector(state=>state.userOrder);

     const [products, setProduct] = useState([
        {
          id: 1,
          url: img7,
          title: "Japan coffee outer",
          description:
            "Silk and linen blend polo shirt with stripes that fits slim",
          rating: 4.2,
          price: 450,
          category: "Men",
          color: "red",
          quantity: 1,
          size: "M",
        },
]);
  return (
   <div className=" mt-3 px-3 py-3">
            {
              orders.length > 0 ? orders.map((product)=>{
           return <UserOrderedProducts product={product} key={product.id}/>
           })
          :  <div className="w-200 h-20 flex flex-col items-center ">
                    <p className="text-center text-2xl font-bold">Your Cart Is Empty</p>
                    <div className='w-80'>
                    <img src={cartGif} alt="" />
                    </div>
                    <p className=' text-center mt-3 text-2xl font-bold'>Please place your first order 🛒</p>
                  </div>
                    
          }
          </div>
  )
}

export default MyOrders;