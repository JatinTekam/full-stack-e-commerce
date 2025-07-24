import { useContext, useEffect, useState } from "react";
import UpdateDetail from "./UpdateDetail";
import { Search } from "../context/ProductContext/ProductContext";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { TbMapPinCode } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { FaPhone } from "react-icons/fa";

const MyDetails = ({ firstName,lastName, email, phoneNumber, username, address, zipCode, city, state}) => {
  const{updateData,setUpdateData}=useContext(Search);



  return (
    <div className="w-full p-5">
      <p className="font-bold text-3xl">Personal information</p>
      <p className="mt-2" style={{color:"rgb(0,0,0,0.8)"}}>Manage your personal information, including phone number and email address where you can be contacted</p>
      <div className='w-full flex flex-wrap gap-5 mt-7'>
        <div className="w-90 pb-5 shadow-2xl border border-[#5f5f5f88] rounded-xl">
          <div className="pt-2 flex justify-between ">
            <h1 className="font-bold pl-9 text-2xl mb-2">Name</h1>
            <div className="mt-4 mr-7 text-xl text-blue-500">
            <FaUser/>
            </div>
          </div>
          <div>
              <p className="pl-9 text-xl" style={{color:"rgb(0,0,0,0.6)"}}>{firstName+" "+lastName}</p>
          </div>
        </div>

        <div className={`w-90 pb-5 shadow-2xl border ${address ? "border-[#5f5f5f88]" : "border-red-500"}  rounded-xl`}>
          <div className="pt-2 w-full flex justify-between ">
            <h1 className="font-bold pl-9 text-2xl mb-2">Address</h1>
            <div className="mt-4 mr-7 text-2xl text-blue-500">
            <FaLocationDot/>
            </div>
          </div>
          <div>
               {
              address ? <p className="pl-9  pt-2 text-xl" style={{color:"rgb(0,0,0,0.6)"}}>{address}</p> : <p className="text-center  text-2xl pt-2">--</p>
            }
            
          </div>
        </div>

         <div className={`w-90 pb-5 shadow-2xl border border-[#5f5f5f88]  rounded-xl`}>
          <div className="pt-2 w-full flex justify-between ">
            <h1 className="font-bold pl-9 text-2xl mb-2">Email</h1>
            <div className="mt-4 mr-7 text-2xl text-blue-500">
            <MdEmail/>
            </div>
          </div>
          <div>
              <p className="pl-9 pt-2 text-xl" style={{color:"rgb(0,0,0,0.6)"}}>{email}</p> 
          </div>
        </div>

        <div className={`w-90 pb-5 shadow-2xl border border-[#5f5f5f88]  rounded-xl`}>
          <div className="pt-2 w-full flex justify-between">
            <h1 className="font-bold pl-9 text-2xl mb-2">Phone Number</h1>
           <div className="mt-4 mr-7 text-2xl text-blue-500">
            <FaPhone/>
            </div>
          </div>
          <div>
              <p className="pl-9 pt-2 text-xl" style={{color:"rgb(0,0,0,0.6)"}}>{phoneNumber}</p> 
          </div>
        </div>


            <div className={`w-90 pb-5 shadow-2xl border ${city ? "border-[#5f5f5f88]" : "border-red-500"} rounded-xl`}>
          <div className="pt-2 w-full flex justify-between">
            <h1 className="font-bold pl-9 text-2xl mb-2">City</h1>
            <div className="mt-4 mr-7 text-2xl text-blue-500">
            <FaCity/>
            </div>
          </div>
          <div>
              {city ? <p className="pl-9 pt-2 text-xl" style={{color:"rgb(0,0,0,0.6)"}}>{city}</p> : <p className=" text-center pt-2 text-xl" style={{color:"rgb(0,0,0,0.6)"}}>--</p>} 
          </div>
        </div>

        <div className={`w-90 pb-5 shadow-2xl border ${state ? "border-[#5f5f5f88]" : "border-red-500"} rounded-xl`}>
          <div className="pt-2 w-full flex justify-between">
            <h1 className="font-bold pl-9 text-2xl mb-2">State</h1>
           <div className="mt-4 mr-7 text-2xl text-blue-500">
            <GrMapLocation/>
            </div>
          </div>
          <div>
              {state ? <p className="pl-9 pt-2 text-xl" style={{color:"rgb(0,0,0,0.6)"}}>{state}</p> : <p className=" text-center pt-2 text-xl" style={{color:"rgb(0,0,0,0.6)"}}>--</p>} 
          </div>
        </div>


         <div className={`w-90 pb-5 shadow-2xl border ${zipCode ? "border-[#5f5f5f88]" : "border-red-500"} rounded-xl`}>
          <div className="pt-2 w-full flex justify-between">
            <h1 className="font-bold pl-9 text-2xl mb-2">Zip Code</h1>
           <div className="mt-4 mr-7 text-2xl text-blue-500">
            <TbMapPinCode/>
            </div>
          </div>
          <div>
              {zipCode ? <p className="pl-9 pt-2 text-xl" style={{color:"rgb(0,0,0,0.6)"}}>{zipCode}</p> : <p className=" text-center pt-2 text-xl" style={{color:"rgb(0,0,0,0.6)"}}>--</p>} 
          </div>
        </div>

      </div>
      <div className="flex justify-end mr-5 mt-8 pb-5">
        <button className="border px-2 py-2 bg-blue-500 hover:shadow-xl text-white rounded-md cursor-pointer flex items-center gap-2"
        onClick={()=>setUpdateData(!updateData)}
        >
          Add / Update
        </button>
      </div>
     {
      updateData ?  <UpdateDetail firstName={firstName} lastName={lastName} username={username} zipCode={zipCode} state={state} city={city} phoneNumber={phoneNumber} email={email} address={address} /> : "" 
     }
    </div>
  );
};

export default MyDetails;
