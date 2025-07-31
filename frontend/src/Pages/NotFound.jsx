import React from 'react'
import pageNotFound from "../assets/images/pageNotFound.jpg"
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

   const navigate = useNavigate();
  
  return (
    <div className='w-screen h-150  flex flex-col items-center'>
      <img src={pageNotFound} alt="" className='w-full h-full object-cover'/>
      <button className='border py-2 px-3 rounded cursor-pointer' onClick={()=>navigate("/")}>Go Back</button>
    </div>
  )
}

export default NotFound