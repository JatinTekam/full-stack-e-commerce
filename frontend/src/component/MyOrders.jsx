import React, { useEffect, useState } from 'react'
import img7 from "../assets/images/img7.jpg";
import { useSelector } from 'react-redux';
import cartGif from "../assets/images/emptyCart.gif"
import UserOrderedProducts from './UserOrderedProducts';


const MyOrders = () => {
 

  const userOrders=useSelector(state=>state.userOrder);
  const {orders}=userOrders;
  const[product,setProduct]=useState([]);
  const[status,setStatus]=useState("");
  const[paymentStatus,setPaymentStatus]=useState("");
  const[shippingTo,setShippingTo]=useState("");
   
useEffect(()=>{  

  for(let key in orders){
    setStatus(orders[key].orderStatus);
  }

  for(let key in orders){
    setPaymentStatus(orders[key].paymentStatus);
  }
  for(let key in orders){
    setShippingTo(orders[key].userAddress);
  }

const allOrderedProducts = Object.values(userOrders.orders).flatMap(
  order => order.orderedProducts
);

 setProduct(allOrderedProducts);

 
},[userOrders])



  return (
   <div className=" mt-3 px-3 py-3">
            {
              product.length > 0 ? product.map((product)=>{
           return <UserOrderedProducts product={product} key={product.productId} status={status} paymentStatus={paymentStatus} shippingTo={shippingTo} />
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