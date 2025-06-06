import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeProduct } from '../features/product/ProductSlice';


const CartProduct = ({item}) => {
  let[productQuantity,setProductQuantity]=useState(1);
  const[productPrice,setProductPrice]=useState(item.price);
  const[totalPrice,setTotalPrice]=useState(item.price);

  


  const dispatch=useDispatch();

 
  useEffect(()=>{
    setProductQuantity(item.quantity);
    
  },[item])

  

  return (
    <div className='flex mb-6 pb-2 border-b '>
       <div className='w-30 rounded-xl overflow-hidden mobile'>
        <img src={item.url} alt="" className='w-full h-full'/>
       </div>
       <div className='w-full '>
        <h2 className='w-full ml-3 pr-2 text-xl mobile-cart-text'>{item.title}</h2>
        <h2 className='w-full ml-3 pr-2 text-sm mobile-cart-desc'>{item.description}</h2>
       <div className='flex'>
       <h4 className=' ml-3 pr-2 text-sm'>Size: <span className='font-bold'>{item.size}</span> </h4>
       <h4 className=' ml-3 pr-2 text-sm'>Color: <span className='font-bold'>{item.color}</span> </h4>
       </div>
       <p className='ml-3 mt-2'>₹ <span className='font-bold'>{productPrice}</span> X {productQuantity}</p>
       <div className='ml-2 mt-3 flex justify-between'>
        <div>
        <button className='border mx-2 px-2 rounded cursor-pointer ' onClick={()=>dispatch(increaseQuantity(item))} >+</button>
        <button className='border px-3  rounded cursor-pointer' onClick={()=>dispatch(decreaseQuantity(item))}>-</button>
        <button className='border mx-2 p-1 rounded cursor-pointer' onClick={()=>dispatch(removeProduct(item.id))}><MdDelete /></button>
        </div>
        <div className=' mr-5'>
        <p className='text-xl'>₹ {item.quantity*item.price}</p>
        </div>
       </div>
       </div>
    </div>
  )
}

export default CartProduct