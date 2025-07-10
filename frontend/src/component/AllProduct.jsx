import React, { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const AllProduct = ({ product }) => {
  const { id, url, title, description, price } = product;
  const[isFav,setIsFav]=useState(false);



  const handleFavProduct=()=>{
    setIsFav(!isFav);
  }

  return (
    <div className="relative">
      <div className={`w-[300px] pb-5 rounded-2xl`}>
        <figure className=" h-[320px] rounded-2xl overflow-hidden">
          <img src={url} alt="" className="imghover" />
        </figure>
        <p className="text-start pl-3 pt-3 font-bold text-lg">{title} </p>
        <p className="text-start pl-3 pt-3 text-sm font-bold">{description}</p>
        <div className="flex justify-between mt-7 ml-3">
          <div className="border p-2 rounded-lg">₹ {price}</div>
          <div className="flex justify-center items-center gap-2">
           
            <div className="mr-3 mt-1 border rounded-xl p-2 cursor-pointer notgo absolute top-1 " onClick={handleFavProduct}>
              <FaHeart className={`text-xl ${isFav ? 'text-red-700' : "text-white"}  notgo  overflow-hidden`} />
            </div>
            
            <Link to={`/product/${id}`}>
            <div className="mr-3 mt-1 border rounded-xl p-2 hover:bg-black hover:text-white cursor-pointer">
              <FiShoppingBag className="text-xl" />
            </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
