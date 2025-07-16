import React, { useState } from "react";
import { BiDetail } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";
import MyDetails from "../component/Mydetails";
import MyOrders from "../component/Myorders";
import { useDispatch } from "react-redux";
import { userInfo } from "../features/user/userSclice";

const Profile = () => {
  const[isActive,setIsActive]=useState(true);

  const dispatch=useDispatch();

  const handleGetUser=()=>{
    dispatch(userInfo({username:"JatinTekam"}))
  }

  const handleIsActive=()=>{
    setIsActive(true)
  }

  const handleIsInActive=()=>{
    setIsActive(false)
  }

 
  return (
    <div className="w-full h-full bg-[#EEEEEE]">
      <div>
        <h1 className="font-extrabold text-3xl mt-2 ml-10">My Profile</h1>
      </div>
      <div className="w-full flex">
        <div>
          <div className="w-120 rounded-xl  mt-5 p-5 ml-10 flex bg-white items-center mb-5">
            <div className="w-20 h-20 border rounded-full flex justify-center items-center bg-[#2D2D2D] mr-2">
              <p className="text-3xl text-white font-bold">JT</p>
            </div>
            <div>
              <p>Hello</p>
              <h1 className="text-start mr-10 text-3xl font-bold">
                Jatin Tekam
              </h1>
            </div>
          </div>
        <div className=" ml-10 flex items-center gap-4 text-xl p-5 mb-2 bg-white cursor-pointer hover:border hover:border-r-0 hover:border-b-0 hover:border-t-0 hover:border-l-4 hover:border-l-blue-500 hover:bg-gray-100" onClick={handleIsActive}><BiDetail/> My details</div>
        <div className=" ml-10 flex items-center gap-4 text-xl p-5 mb-2 bg-white hover:border hover:border-r-0 hover:border-b-0 hover:border-t-0 hover:border-l-4 hover:border-l-blue-500 hover:bg-gray-100 cursor-pointer" onClick={handleIsInActive} ><FiShoppingBag/> My orders</div>
        <div className=" ml-10 flex items-center gap-4 text-xl p-5 bg-white hover:border hover:border-r-0 hover:border-b-0 hover:border-t-0 hover:border-l-4 hover:border-l-blue-500 hover:bg-gray-100 cursor-pointer" onClick={handleGetUser}><SlLogout/>Log out</div>
        </div>
    

      {/* --------------------------------- */}
       <div className='w-190 h-110 rounded-xl mt-5 p-3 ml-10 flex mb-10 bg-white overflow-y-scroll'>
          {
            isActive ? <MyDetails />  : <MyOrders />
          }
        </div>

  </div>
  </div>

  );
};

export default Profile;
