import React, { useEffect } from "react";
import { RiDiscountPercentFill } from "react-icons/ri";
import { IoTimeOutline } from "react-icons/io5";
import { RiCustomerServiceLine } from "react-icons/ri";
import { CiDeliveryTruck } from "react-icons/ci";
import { useState } from "react";
const Service = () => {
    const[date,setDate]=useState();
  
    useEffect(()=>{
        setDate(new Date(Date.now()+(3600*1000*72)).toLocaleDateString());
    },[date])
  

  return (
    <div className="w-full mt-12 mb-12 flex justify-center gap-15 flex-wrap ">
      <div className=" flex justify-center items-center gap-3 ">
        <figure className="text-2xl  text-white bg-black rounded-xl p-2">
          <RiDiscountPercentFill />
        </figure>
        <div>
            <p>Discount</p>
            <p>{">"}₹1000 Discount Upto 20%</p>
        </div>
      </div>
      <div className="w-[247px] flex justify-center items-center gap-2 mybox">
        <figure className="text-2xl text-white bg-black rounded-xl p-2">
          <IoTimeOutline />
        </figure>
         <div>
            <p>Time</p>
            <p>6-10 Working Days</p>
        </div>
      </div>
      <div className="w-[247px]  flex justify-center items-center gap-2 mybox">
        <figure className="text-2xl text-white bg-black rounded-xl p-2">
          <RiCustomerServiceLine />
        </figure>
         <div>
            <p>Service</p>
            <p>24/7 Support</p>
        </div>
      </div>
      <div className="w-[247px]  flex justify-center items-center gap-2 mybox">
        <figure className="text-2xl text-white bg-black rounded-xl p-2">
          <CiDeliveryTruck />
        </figure>
         <div>
            <p>Estimate Arrival</p>
            <p>{date}</p>
        </div>
      </div>
     
    </div>
  );
};

export default Service;
