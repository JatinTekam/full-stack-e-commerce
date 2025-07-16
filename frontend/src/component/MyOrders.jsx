import React, { useState } from 'react'
import img7 from "../assets/images/img7.jpg";
import CartProduct from './CartProduct';
import UserProduct from './UserProduct';

const MyOrders = () => {
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
           {products.map((product)=>{
           return <UserProduct product={product} key={product.id}/>
           })}
          </div>
  )
}

export default MyOrders;