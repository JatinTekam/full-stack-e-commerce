import React, { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { LiaUserSolid } from "react-icons/lia";
import { Link, NavLink } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Search } from "../ProductContext/ProductContext";

const Header = () => {

  const{search,setSearch,showCart,setShowCart}=useContext(Search);
  const[visible,setVisible]=useState(false);

  const handleSearch = () => {
    setSearch(!search)
  };

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
        <li className=" py-2  hover:cursor-pointer ">Men</li>
        <li className=" py-2  hover:cursor-pointer ">Women</li>
        <li className=" py-2  hover:cursor-pointer ">Chidren</li>
        <li className=" py-2  hover:cursor-pointer ">
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
      <div className="flex gap-3 justify-center items-center">
        <div>
          <Menu>
            <MenuButton>
              <li className="list-none p-2 text-xl border rounded-xl hover:cursor-pointer mt-1.5">
                <LiaUserSolid />
              </li>
            </MenuButton>
            <MenuItems
              transition
              className="absolute option sm:right-10 md:right-20  xl:right-50 z-10 mt-1 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <MenuItem>
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                 My Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                 Log Out
                </Link>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>

        <li
          className="list-none p-2 text-xl border rounded-xl hover:cursor-pointer"
          onClick={handleSearch}
        >
          <CiSearch />
        </li>
        <li className="list-none p-2 text-xl border rounded-xl hover:cursor-pointer">
          <NavLink className="relative" onClick={()=>setShowCart(!showCart)}>
            <FiShoppingBag />
            <p className="absolute left-[20px] top-[11px] border border-amber-50 rounded-3xl px-1 bg-black text-sm">1</p>
          </NavLink>
        </li>
          <li className="list-none p-2 text-xl border rounded-xl hover:cursor-pointer lg:hidden" onClick={()=>setVisible(true)}>
            <CiMenuBurger/>
          </li>
      </div>

     {/* Side Menu Bar For Mobile Screen */}

      <div className={`absolute top-0 right-0 z-10 bottom-0 overflow-hidden bg-black transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col">
            <div className="flex items-center  gap-1 p-3 text-white text-2xl " onClick={()=>setVisible(false)}>
                    <IoMdArrowBack className="cursor-pointer"/>
                    <p className="pb-0.5 cursor-pointer">Back</p>
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
            <li className="mb-4 mt-2 list-none">
            <NavLink to="/about" className="p-3 " onClick={()=>setVisible(false)}>About</NavLink>
            </li> 
            </div>
        </div>
      </div>

    </div>
  );
};

export default Header;
