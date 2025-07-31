import React, { useContext, useEffect, useState } from 'react'
//import imges from "../Heroimages.json";
import {images} from "../assets/products.js"
import "../All_CSS/Heropage.css";
import BestSelling from '../component/BestSelling.jsx';
import HeroPageImages from '../component/HeroPageImages.jsx';
import FreshArrival from '../component/FreshArrival.jsx';
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Testimonials from '../component/Testimonials.jsx';
import Service from '../component/Service.jsx';

const Heropage = () => {

  const[headerImages,setHeaderImages]=useState([]);


 useEffect(()=>{
 setHeaderImages(images)
  
 },[])

 
  
    
  return (
    <>
    <div className=' pb-10  text-white pt-10 bg-black'>
        <div className='flex flex-col items-center'>
       <Link to="/collection">
       <h3 className='py-3 px-2 border-1 rounded-xl flex justify-center items-center font-bold gap-2 hover:cursor-pointer'>New Spring Collection 2025</h3>
       </Link>
        <p className='text-4xl mt-8 font-bold text-center'><i>Where style meets expression, trends inspire, and fashion thrives</i></p>
        <p className='pt-4 text-md text-center'>Step into a fashion where the latest trends meet your unique style aspirations. Redefine your wardrobe with Desober today !</p>
        </div>
      <div className='overflow-x-hidden'>
        <div className='flex justify-around mt-15 gap-5 '>
           {
             headerImages?.map((image,index)=>{
                return <HeroPageImages image={image} index={index} key={index}/>
            })
           }
        </div>
       
       </div>
    </div>
    <BestSelling/>
    <FreshArrival/>
    <Testimonials/>
    <Service/>
    </>
  )
}

export default Heropage