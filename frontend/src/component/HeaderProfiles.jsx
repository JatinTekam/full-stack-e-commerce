import React, { useContext } from "react";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { NavLink, Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LiaUserSolid } from "react-icons/lia";
import { Search } from "../ProductContext/ProductContext";
import { useSelector } from "react-redux";


const HeaderProfiles = () => {

    const{search,setSearch,showCart,setShowCart,cartItem,setcartItem}=useContext(Search);
    const product=useSelector((state)=>state.productReducer.products);

    const handleSearch = () => {
        setSearch(!search)
      };


  return (
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
        <NavLink className="relative" onClick={() => setShowCart(!showCart)}>
          <FiShoppingBag />
          {product.length > 0 && (
            <p className="absolute left-[20px] -top-[10px] border border-amber-50 rounded-3xl px-1 bg-black text-sm">
              {product.length}
            </p>
          )}
        </NavLink>
      </li>
      <li
        className="list-none p-2 text-xl border rounded-xl hover:cursor-pointer lg:hidden"
        onClick={() => setVisible(true)}
      >
        <CiMenuBurger />
      </li>
    </div>
  );
};

export default HeaderProfiles;
