import React, { useContext, useState } from 'react'
//import imges from "../Heroimages.json";
import {images} from "../assets/image.js"
import "../All_CSS/Heropage.css";
import { Search } from '../ProductContext/ProductContext.jsx';
import BestSelling from '../component/BestSelling.jsx';
import HeroPageImages from '../component/HeroPageImages.jsx';
import FreshArrival from '../component/FreshArrival.jsx';
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Heropage = () => {

  const [sreach]= useContext(Search);
  
    
  return (
    <>
    <div className=' pb-10 bg-black  text-white pt-10'>
       { sreach && <div className='text-center mb-10'> 
            <input type="text" className='w-[70vw] bg-transparent md:w-[450px] p-2 outline-none border rounded-2xl' placeholder='Search Here'/>
        </div>}
        <div className='flex flex-col items-center'>
       <Link to="/collection">
       <h3 className='py-3 px-2 border rounded-xl flex justify-center items-center gap-2 hover:cursor-pointer'>New Spring Collection 2025 <FaArrowRight className='move text-2xl'/></h3>
       </Link>
        <p className='text-4xl mt-8 text-center'><i>Where style meets expression, trends inspire, and fashion thrives</i></p>
        <p className='pt-4 text-md text-center'>Step into a fashion where the latest trends meet your unique style aspirations. Redefine your wardrobe with Desober today !</p>
        </div>
      <div className='overflow-x-hidden'>
        <div className='flex justify-around mt-15 gap-5 '>
           {
            images.map((image,index)=>{
                return <HeroPageImages image={image} index={index} key={index}/>
            })
           }
        </div>
       
       </div>
    </div>
    <BestSelling/>
    <FreshArrival/>
    </>
  )
}

export default Heropage