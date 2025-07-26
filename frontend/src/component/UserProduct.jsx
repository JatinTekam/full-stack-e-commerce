import React, { useState } from 'react'

const UserProduct = ({product}) => {
    
  return (
    <div className='w-full flex gap-2 mb-3'>
        <div className='w-30'>
            <img src={product.url} alt=""  className='object-contain'/>
        </div>
       <div className='w-130'>
         <p className='text-md'>{product.title}</p>
         <p className='text-sm'>{product.description}</p>
         <p className='text-sm'>Category:- <span className='font-bold'>{product.category}</span></p>
         <p className='text-sm'>Color:- <span className='font-bold'>{product.color}</span></p>
         <p className='text-sm'>Size:- <span className='font-bold'>{product.size}</span></p>
         <p className='text-sm'>Price:- <span className='font-bold'>₹ {product.price} X {product.quantity}</span></p>
    </div>
    </div>
  )
}

export default UserProduct