import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search } from "../ProductContext/ProductContext";
import { useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import HeaderProfiles from "./HeaderProfiles";
import Register from "./Register";

const Header = () => {
  const[isLogined,setIsLogined]=useState(false);
  const[visible,setVisible]=useState(false);
  const { user } = useSelector((state) => state.login);
  return (
    <div className="bg-black phone sm:px-10 md:px-20 lg:bg-black text-white py-8 flex justify-between items-center px-45 h-25">
      <h2 className="text-3xl">
        <i>Rive</i>
      </h2>
      <ul className="hidden lg:flex  justify-between  gap-7 ml-15">
        <li className="py-2  hover:cursor-pointe ">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className=" py-2  hover:cursor-pointer ">
          <NavLink to="/collection">Collection</NavLink>
        </li>

        <li className=" py-2  hover:cursor-pointer ">
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
     {
      user ? <HeaderProfiles/> : <Register/>
     }

     {/* Side Menu Bar For Mobile Screen */}

      <div className={`absolute top-0 right-0 z-10 bottom-0 overflow-hidden bg-black transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col">
            <div
                    className="w-15 mt-10 ml-10 p-4 text-2xl border rounded-4xl cursor-pointer"
                    onClick={()=>setVisible(false)}
                  >
                    <FaArrowLeftLong />
                  </div>

            <div className="mt-10 flex flex-col gap-2 text-center">
            <li className="mb-4 mt-2 list-none">
            <NavLink to="/" className="p-3" onClick={()=>setVisible(false)}>Home</NavLink>
            </li>
            <li className="mb-4 mt-2 list-none">
            <NavLink to="/collection" className="p-3" onClick={()=>setVisible(false)}>Collection</NavLink>
            </li>
            <li className="mb-4 mt-2 list-none">
            <NavLink to="/contact" className="p-3 " onClick={()=>setVisible(false)}>Contact</NavLink>
            </li>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Header;
