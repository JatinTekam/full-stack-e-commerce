import React, { useContext, useState } from "react";
import { Search } from "../context/ProductContext/ProductContext";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../features/updateUser/updateUser";

const UpdateDetail = ({name, username, phoneNumber, email, address}) => {
    const{updateData,setUpdateData}=useContext(Search);
    const dispatch=useDispatch();
    const[userUpdateData,setUserUpdateData]=useState({
        name:name,
        username:username,
        phoneNumber:phoneNumber,
        email:email,
        address:address
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
        dispatch(updateUserDetails(userUpdateData))
        
    }



  return (
    <div
      className="w-screen h-screen absolute top-0 left-0  flex justify-center items-center "
      style={{ backgroundColor: "rgb(0,0,0,0.7)" }}
    >
      <div className="w-130 h-scrren absolute top-3">
        
        <form
          action=""
          className=" bg-gray-300 pt-5 flex flex-col items-center mt-30 pb-3 rounded"
          onSubmit={handleUpadteData}
        >
            <h1 className="font-bold text-xl">Update Form</h1>
          <div className="flex flex-col mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={userUpdateData.name}
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
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={userUpdateData.email}
              className="w-60 border p-2 rounded-sm outline-none"
             onChange={handleUserUpdate}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="address">Address</label>
            <textarea name="address" value={userUpdateData.address} className="w-60 border"
            onChange={handleUserUpdate}
            ></textarea>
          </div>

          <div className=" w-full flex justify-center mt-2  mr-5 gap-4">
            <button className="border px-2 py-2 bg-blue-500 hover:shadow-xl text-white rounded-md cursor-pointer flex items-center gap-2"
            type="submit"
            >
              Sunbmit
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
