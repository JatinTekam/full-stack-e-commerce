import React, { useState } from 'react'
import { useEffect } from 'react';

import { useLoaderData } from 'react-router-dom'
import {allProduct} from "../assets/image.js"
import star from "../assets/images/star1.png"


const IndiviualPage = () => {
    const[indiviualProduct,setIndiviualProduct]=useState([]);
    const[colorText,setColorText]=useState("Oval Black");
    const[size,setSize]=useState("M");

      const id= useLoaderData();

    useEffect( ()=>{
       setIndiviualProduct(allProduct.filter(product=>product.id===Number(id)))
    },[])


    const handleText=(e)=>{
      setColorText(e.target.value);
    }

   const handleSize=(e)=>{
      setSize(e.target.outerText);
      
   }
  
    

 
  return (
    <div className='w-full h-140 flex justify-center'>
       { indiviualProduct && indiviualProduct.length > 0 &&  <div className='w-200 h-full border flex'>
              <div className='imagbox w-100 h-full pt-4 pl-3 pb-4  '>
                { <img src={indiviualProduct[0].url} alt="" className='h-full rounded-xl'/> }
              </div>
              <div className='details pt-7 pl-5 '>
                  <h1 className='text-2xl'>{indiviualProduct[0].title}</h1>
                  <p className='text-md'>{indiviualProduct[0].description}</p>
                  <div className='flex items-center'>
                    <div className='w-5 '>
                    <img src={star} alt="" />
                    </div>
                  <p className='text-md ml-1'>{indiviualProduct[0].rating}</p>
                  </div>

                  <div className='mt-3'>
                    Color: <span className='font-bold'>{colorText}</span>
                  </div>
                  <div className='mt-3 flex gap-2'>
                    <div className='p-1 rounded'>
                      <button className='bg-yellow-700 w-10 h-5 rounded cursor-pointer' value={"Royal Yellow"} onClick={handleText}></button>
                    </div>
                    <div className=' p-1 rounded' >
                      <button className='bg-black w-10 h-5 rounded cursor-pointer' value={"Oval Black"} onClick={handleText}></button>
                    </div>
                    <div className=' p-1 rounded' >
                      <button className='bg-gray-500 w-10 h-5 rounded cursor-pointer' value={"Rub Gray"} onClick={handleText}></button>
                    </div>
                    
                  </div>
                  <div className='mt-3'>
                    Size: <span className='font-bold'>{size}</span>
                  </div>
                  <div className='mt-3 flex gap-2'>
                    <div className='p-1 rounded'>
                    <p className='border px-4 rounded-sm cursor-pointer'onClick={handleSize}>S</p>
                    </div>
                    <div className=' p-1 rounded' >
                     <p className='border px-4 rounded-sm cursor-pointer' onClick={handleSize}>M</p>
                    </div>
                    <div className=' p-1 rounded' >
                    <p className='border px-4 rounded-sm cursor-pointer ' onClick={handleSize}>L</p>
                    </div>
                    <div className=' p-1 rounded' >
                    <p className='border px-4 rounded-sm cursor-pointer' onClick={handleSize}>XL</p>
                    </div>
                    <div className=' p-1 rounded' >
                    <p className='border px-4 rounded-sm cursor-pointer' onClick={handleSize}>2XL</p>
                    </div>
                    
                  </div>
              </div>
        </div>
       }
    </div>
  )
}

export default IndiviualPage