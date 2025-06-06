import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { FiShoppingBag } from "react-icons/fi";
import { useLoaderData, useNavigate } from 'react-router-dom'
import star from "../assets/images/star1.png"
import { Search } from '../ProductContext/ProductContext.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/product/ProductSlice.js';
import { FaArrowLeftLong } from 'react-icons/fa6';


const IndiviualPage = () => {
  const products=useSelector((state)=>state.productReducer.productData);
 
    const[indiviualProduct,setIndiviualProduct]=useState([products[0]]);
    const[color,setColor]=useState("Oval Black");
    const[size,setSize]=useState("M");
    const[quantity,setQuantity]=useState(1);
    const{cartItem,setcartItem}=useContext(Search);
    const[cartItems,setCartItems]=useState([]);

    const dispatch=useDispatch();
    const productsCart=useSelector((state)=>state.productReducer.products);
    const id= useLoaderData();
    const navigate = useNavigate();
    

    useEffect( ()=>{
       const indProduct=products.filter(product=>product.id===Number(id));
       setQuantity(indProduct[0].quantity);
       setIndiviualProduct(indProduct);
    },[])


    useEffect(()=>{
      setCartItems([...cartItems,...productsCart])
     
    },[])


    const handleText=(e)=>{
      setColor(e.target.value);
    }

   const handleSize=(e)=>{
      setSize(e.target.outerText);
      
   }

   const handleAddQuantity=()=>{

    if(quantity<6){
      setQuantity(prev=>prev+1);
    
    }
    
    
   }

   const handleLessQuantity=()=>{
    if(quantity>1){
      setQuantity(prev=>prev-1);

    }
   }

   const handleAddToCart=(product)=>{


    dispatch(addToCart({...product,quantity,size,color}))
    
    //console.log(productsCart);
    
   
    const present=productsCart.filter((item)=>item.id===product.id);
    //console.log(pre);
    
     let newItem=null; 
    

    
       newItem={...indiviualProduct[0],quantity,size,color};
       setcartItem(prev=>[...prev,newItem])
    
     
      
        
   
    
    
    
    
   }

  


 
  return (
    <div className='w-full flex justify-center'>
       { indiviualProduct && indiviualProduct.length > 0 &&  <div className='w-200 border flex mobile-cart'>
              <div className='imagbox w-100  pt-4 pl-3 pb-4  mobile-width'>
                { <img src={indiviualProduct[0].url} alt="" className='h-full rounded-xl '/> }
              </div>
              <div className='details pt-7 pl-5 '>
                  <h1 className='text-2xl font-bold'>{indiviualProduct[0].title}</h1>
                  <p className='text-md'>{indiviualProduct[0].description}</p>
                  <div className='flex items-center'>
                    <div className='w-5 '>
                    <img src={star} alt="" />
                    </div>
                  <p className='text-md ml-1'>{indiviualProduct[0].rating}</p>
                  </div>

                  <div className='mt-3'>
                    Color: <span className='font-bold'>{color}</span>
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
                  <div className='mt-3 flex gap-2 mobile-size'>
                    <div className='p-1 rounded'>
                    <p className='border px-4 rounded-sm hover:cursor-pointer hover:bg-black hover:text-white'onClick={handleSize}>S</p>
                    </div>
                    <div className=' p-1 rounded' >
                     <p className='border px-4 rounded-sm hover:cursor-pointer hover:bg-black hover:text-white' onClick={handleSize}>M</p>
                    </div>
                    <div className=' p-1 rounded' >
                    <p className='border px-4 rounded-sm  hover:cursor-pointer hover:bg-black hover:text-white' onClick={handleSize}>L</p>
                    </div>
                    <div className=' p-1 rounded' >
                    <p className='border px-4 rounded-sm hover:cursor-pointer hover:bg-black hover:text-white' onClick={handleSize}>XL</p>
                    </div>
                    <div className=' p-1 rounded' >
                    <p className='border px-4 rounded-sm hover:cursor-pointer hover:bg-black hover:text-white' onClick={handleSize}>2XL</p>
                    </div>
                  </div>


                 
                  <div className='mt-3'>
                    Qantity
                  </div>
                  <div className='mt-3 flex items-center gap-2 ml-2'>
                        <button className='border px-2 rounded hover:cursor-pointer hover:bg-black hover:text-white' onClick={handleLessQuantity}>-</button>
                        <p className='font-bold'>{quantity}</p>
                        <button className='border px-2 rounded hover:cursor-pointer hover:bg-black hover:text-white' onClick={handleAddQuantity}>+</button>
                  </div>
                  <div className='mt-3'>
                    <p>₹  <sub className='font-bold text-xl'> {indiviualProduct[0].price}</sub></p>
                  </div>
                  <div className='mt-6 flex items-center gap-2'>
                    <button className='border px-2 py-2 bg-blue-500 hover:shadow-xl text-white rounded-md cursor-pointer flex items-center gap-2' onClick={()=>handleAddToCart(indiviualProduct[0])}>Add To Cart <FiShoppingBag/></button>
                    <button className='cursor-pointer flex gap-2 items-center border px-2 py-2  hover:shadow-xl rounded-md ' onClick={()=>navigate(-1)}><FaArrowLeftLong />Go Back</button>
                  </div>
              </div>
        </div>
       }
    </div>
  )
}

export default IndiviualPage