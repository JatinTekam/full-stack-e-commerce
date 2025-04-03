import React, { useContext, useState } from 'react'
//import imges from "../Heroimages.json";
import image from "../assets/image.js"
import "../All_CSS/Heropage.css";
import { Search } from '../Context/SearchContext';

const Heropage = () => {

  const [sreach]= useContext(Search);

    
  return (
    <div className=' pb-10 bg-black  text-white pt-10'>
       { sreach && <div className='text-center mb-10'> 
            <input type="text" className='bg-transparent w-[400px] p-2 outline-none border rounded-2xl' placeholder='Search Here'/>
        </div>}
        <div className='flex flex-col items-center'>
        <h3 className='py-3 px-2 border rounded-xl '>New Spring Collection 2025</h3>
        <p className='text-4xl pt-15 text-center'><i>Where style meets expression, trends inspire, and fashion thrives</i></p>
        <p className='pt-4 text-md text-center'>Step into a fashion where the latest trends meet your unique style aspirations. Redefine your wardrobe with Desober today !</p>
        </div>
      <div className='overflow-x-hidden'>
        <div className='flex justify-around mt-15 gap-5 '>
            <figure className='min-w-[200px] h-[300px] '>
                <img src={image.img1} alt="" className='w-full h-[300px] rounded-t-4xl'/>
            </figure>
            <figure className='hide1 min-w-[200px] h-[300px]'>
                <img src={image.img2} alt="" className='w-full h-[300px] rounded-t-4xl'/>
            </figure>
            <figure className='hide min-w-[200px] h-[300px]'>
                <img src={image.img3} alt="" className='w-full h-[300px] rounded-t-4xl'/>
            </figure>
            <figure className='hidden md:block min-w-[200px] h-[300px]'>
                <img src={image.img4} alt="" className='w-full h-[300px] rounded-t-4xl'/>
            </figure>
            <figure className='hidden lg:block min-w-[200px] h-[300px] '>
                <img src={image.img5} alt="" className='w-full h-[300px] rounded-t-4xl'/>
            </figure>
            <figure className='hidden lg:block min-w-[200px] h-[300px]'>
                <img src={image.img6} alt="" className='w-full h-[300px] rounded-t-4xl'/>
            </figure>     
        </div>
       
       </div>
      
        
    </div>
  )
}

export default Heropage