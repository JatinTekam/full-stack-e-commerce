import React, { useContext, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";
import MyDetails from "../component/Mydetails";
import MyOrders from "../component/Myorders";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { errorMsg } from "../utils/messages";
import { ToastContainer } from "react-toastify";
import { clearUserLogin } from "../features/login/loginSlice";
import { useNavigate } from "react-router-dom";
import { clearUserOrder } from "../features/userOrders/userOrders";
import { clearUser } from "../features/user/userSclice";
import { clearUserSignUp } from "../features/signup/SignupSlice";



const Profile = () => {
  const[isActive,setIsActive]=useState(true);
  const{firstName,lastName,email,phoneNumber,username,address,error,city,state,zipCode}=useSelector(state=>state.user);

  const dispatch=useDispatch();
  const navigate=useNavigate();


  const handleIsActive=()=>{
    setIsActive(true)
  }

  const handleIsInActive=()=>{
    setIsActive(false)
  }

  const handleUserLogout=()=>{
      dispatch(clearUserLogin())
      dispatch(clearUserOrder());
      dispatch(clearUserSignUp());
      dispatch(clearUser());
      navigate("/");
  }

  useEffect(()=>{
      if(error){      
        errorMsg(error.data.message);
        return;
      }
  },[firstName,lastName,email,phoneNumber,username,address,error])

 
  return (
    <div className="w-full flex flex-col h-full bg-[#EEEEEE] ">
      <div>
        <h1 className="font-extrabold text-3xl mt-2 ml-60">My Profile</h1>
      </div>
      <div className="w-full  flex justify-center">
        <div>
          <div className="w-120 rounded-xl  mt-5 p-5 ml-10 flex bg-white items-center mb-5">
            <div className="w-20 h-20 border rounded-full flex justify-center items-center bg-[#2D2D2D] mr-2">
              <p className="text-3xl text-white font-bold">{firstName && firstName.toUpperCase().split(" ")[0].charAt(0)+""+lastName.toUpperCase().split(" ")[0].charAt(0)}</p>
            </div>
            <div>
              <p>Hello 👋</p>
              <h1 className="text-start mr-10 text-3xl font-bold">
                {firstName+" "+lastName}
              </h1>
              <h2>{email}</h2>
            </div>
          </div>
        <div className=" ml-10 flex items-center gap-4 text-xl p-5 mb-2 bg-white cursor-pointer hover:border hover:border-r-0 hover:border-b-0 hover:border-t-0 hover:border-l-4 hover:border-l-blue-500 hover:bg-gray-100" onClick={handleIsActive}><BiDetail/> My details</div>
        <div className=" ml-10 flex items-center gap-4 text-xl p-5 mb-2 bg-white hover:border hover:border-r-0 hover:border-b-0 hover:border-t-0 hover:border-l-4 hover:border-l-blue-500 hover:bg-gray-100 cursor-pointer" onClick={handleIsInActive} ><FiShoppingBag/> My orders</div>
        <div className=" ml-10 flex items-center gap-4 text-xl p-5 bg-white hover:border hover:border-r-0 hover:border-b-0 hover:border-t-0 hover:border-l-4 hover:border-l-blue-500 hover:bg-gray-100 cursor-pointer" onClick={handleUserLogout}><SlLogout/>Log out</div>
        </div>
    

      {/* --------------------------------- */}
       <div className='w-220 h-130 rounded-xl mt-5 p-3 ml-10 flex mb-10 bg-white overflow-y-scroll'>
          {
            isActive && firstName ? <MyDetails firstName={firstName} lastName={lastName} email={email} phoneNumber={phoneNumber} username={username} address={address} zipCode={zipCode} city={city} state={state} />  : <MyOrders />
          }
        </div>

  </div>
  <ToastContainer/>
  </div>

  );
};

export default Profile;
