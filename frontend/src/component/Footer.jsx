import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";

const Footer = () => {
  return (
    <div className='w-full  bg-black pb-4'>
    <div className='w-full text-white flex flex-wrap justify-center items-center pb-4 gap-5 '>
      <div className="w-[700px] h-full flex flex-col justify-center mt-3">
        <i className='text-2xl block mb-3 '>Rive</i>
        <i className='mb-3'>"Embrace Your Uniqueness Style That Speaks or Fashion Forward Always"</i>
        <p>+919478652394</p>
      </div>
      {/* <div className="w-[350px] h-full flex flex-col justify-center pl-2 ">
        <h2 className='pt-7 mb-3 '>Company</h2>
        <ul className=' mb-3 flex gap-2'>
          <li>Home</li>
          <li>About us</li>
          <li>Privacy policy</li>
          <li>Delivery Info</li>
        </ul>
        
      </div> */}
      <div className="w-[500px]  flex flex-col justify-center pl-2">
      <h2 className='pt-0 mb-3 '>Our Socials</h2>
        <div className='flex gap-3 text-2xl'>
        <FaFacebookSquare/>
        <IoLogoInstagram/>
        </div>
        <p className=''>Stay Connected WIth 🤌 contact@rive.com</p>
      </div>
    </div>
    <p className='text-white text-center'>Copyright {new Date().getFullYear()} Rive.com All Right Reserved.</p>
    </div>
  )
}

export default Footer