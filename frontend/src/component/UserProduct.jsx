import React, { useState } from 'react'

const UserProduct = ({product}) => {
    
  return (
    <div className='w-full flex gap-2 mb-3'>
        <div className='w-40'>
            <img src={product.url} alt=""  className='object-contain'/>
        </div>
       <div className='w-130'>
         <p className='text-xl'>{product.title}</p>
         <p className='text-lg'>{product.description}</p>
         <p className='text-lg'>Category:- <span className='font-bold'>{product.category}</span></p>
         <p className='text-lg'>Color:- <span className='font-bold'>{product.color}</span></p>
         <p className='text-lg'>Size:- <span className='font-bold'>{product.size}</span></p>
         <p className='text-lg'>Price:- <span className='font-bold'>₹ {product.price}</span></p>
         <div className='text-end'>
            <p className='p-3 rounded-xl text-green-600'>Paid</p>
         </div>
    </div>
    </div>
  )
}

export default UserProduct