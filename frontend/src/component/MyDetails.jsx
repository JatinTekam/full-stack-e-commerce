import { useContext, useState } from "react";
import UpdateDetail from "./UpdateDetail";
import { Search } from "../context/ProductContext/ProductContext";


const MyDetails = ({ name, email, phoneNumber, username, address }) => {
  const{updateData,setUpdateData}=useContext(Search);
  return (
    <div className="w-full p-5">
      <div>
        <p className="text-2xl p-3 " id="name">
          Name:- <span className="p-2 text-2xl text-gray-700 ">{name}</span>
        </p>
        <p className="text-2xl p-3">
          Username:-{" "}
          <span className="p-2 text-2xl text-gray-700">{username}</span>
        </p>
        <p className="text-2xl p-3">
          Phone No:-{" "}
          <span className="p-2 text-2xl text-gray-700">{phoneNumber}</span>
        </p>
        <p className="text-2xl p-3">
          Email:- <span className="p-2 text-2xl text-gray-700">{email}</span>
        </p>
        <p className="text-2xl p-3">
          Address:-{" "}
          <span
            className={`p-2 text-2xl text-gray-700 ${
              address ? "text-green-400" : "text-red-500"
            }`}
          >
            {address ? address : "Address Should't Empty"}{" "}
          </span>
        </p>
      </div>
      <div className="flex justify-end mr-5 mt-8">
        <button className="border px-2 py-2 bg-blue-500 hover:shadow-xl text-white rounded-md cursor-pointer flex items-center gap-2"
        onClick={()=>setUpdateData(!updateData)}
        >
          Add / Update
        </button>
      </div>
     {
      updateData ?  <UpdateDetail name={name} username={username} phoneNumber={phoneNumber} email={email} address={address} /> : "" 
     }
    </div>
  );
};

export default MyDetails;
