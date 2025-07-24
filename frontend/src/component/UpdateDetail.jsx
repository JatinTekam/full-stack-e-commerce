import React, { useContext, useEffect, useState } from "react";
import { Search } from "../context/ProductContext/ProductContext";
import { useDispatch, useSelector } from "react-redux";
import { clearUserUpdate, updateUserDetails } from "../features/updateUser/updateUser";
import { errorMsg, successMsg } from "../utils/messages";
import loadingGif from "../assets/images/loading.gif";
import { userInfo } from "../features/user/userSclice";
import { useNavigate } from "react-router-dom";
import { clearUserLogin } from "../features/login/loginSlice";

const UpdateDetail = ({firstName, lastName, username, zipCode, state, city, phoneNumber, email, address}) => {

    const{updateData,setUpdateData}=useContext(Search);
    const dispatch=useDispatch();

    const navigate=useNavigate();

    const{message, loading, errorMessage, status}=useSelector(state=>state.updateUser);

    const { accessToken } = useSelector(
    (state) => state.login
  );

    const[userUpdateData,setUserUpdateData]=useState({
        firstName:firstName,
        lastName:lastName,
        username:username,
        phoneNumber:phoneNumber,
        email:email,
        address:address,
        city:city,
        state:state,
        zipCode:zipCode
    })

    const handleUserUpdate=(e)=>{
        const{name,value}=e.target;
        setUserUpdateData({
            ...userUpdateData,
            [name]:value
        }
        );
    }

    const handleUpadteData=(e)=>{
        e.preventDefault();
        dispatch(updateUserDetails({userUpdateData,accessToken}))
        
    }


    useEffect(()=>{

      if(status===200){
        successMsg(message);
        setUpdateData(!updateData);
         dispatch(userInfo({username,accessToken}));
         dispatch(clearUserUpdate())
        return;
      }

      if (errorMessage) {
        errorMsg(errorMessage);
        dispatch(clearUserUpdate())
        dispatch(clearUserLogin())
        navigate("/login")
        return;
      }

    },[message, loading, errorMessage, address, firstName, lastName, username, phoneNumber, email, city, state, zipCode])



  return (
    <div
      className="w-screen h-screen absolute top-0 left-0  flex justify-center items-center "
      style={{ backgroundColor: "rgb(0,0,0,0.7)" }}
    >
      <div className="w-180 h-scrren absolute top-3">
       
        <form
          action=""
          className=" bg-gray-300 pt-5 flex flex-col items-center mt-30 pb-3 rounded"
          onSubmit={handleUpadteData}
        >
          <div>
             <h1 className="font-bold text-xl ">Update Form</h1>
          </div>
            
           <div className="w-full flex gap-4 flex-wrap justify-center">
          <div className="flex flex-col mb-2">
            <label htmlFor="firstName" className="mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={userUpdateData.firstName}
              className="w-60 border p-2 rounded-sm outline-none"
              onChange={handleUserUpdate}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="lastName" className="mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={userUpdateData.lastName}
              className="w-60 border p-2 rounded-sm outline-none"
              onChange={handleUserUpdate}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={userUpdateData.username}
              className="w-60 border p-2 rounded-sm outline-none"
              onChange={handleUserUpdate}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="phoneNumber">Phone No</label>
            <input
              type="text"
              name="phoneNumber"
              value={userUpdateData.phoneNumber}
              className="w-60 border p-2 rounded-sm outline-none"
              onChange={handleUserUpdate}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              value={userUpdateData.city}
              className="w-60 border p-2 rounded-sm outline-none"
             onChange={handleUserUpdate}
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="state">State</label>
            <input
              type="text"
              name="state"
              value={userUpdateData.state}
              className="w-60 border p-2 rounded-sm outline-none"
             onChange={handleUserUpdate}
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="number"
              name="zipCode"
              value={userUpdateData.zipCode}
              className="w-60 border p-2 rounded-sm outline-none"
             onChange={handleUserUpdate}
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="address">Address</label>
            <textarea name="address" value={userUpdateData.address} className="w-60 border p-2"
            onChange={handleUserUpdate}
            ></textarea>
          </div>
          </div> 

          <div className=" w-full flex justify-center mt-2  mr-5 gap-4">
            <button className="border px-2 py-2 bg-blue-500 hover:shadow-xl text-white rounded-md cursor-pointer flex items-center gap-2"
            type="submit"
            >
              {
                loading ?  <img src={loadingGif} alt="" className="w-5" /> :  "Submit"
            }
             
            </button>
            <button className="border px-2 py-2 bg-red-500 hover:shadow-xl text-white rounded-md cursor-pointer flex items-center gap-2"
            onClick={()=>setUpdateData(!updateData)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDetail;
