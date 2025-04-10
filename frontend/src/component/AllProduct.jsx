import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

const AllProduct = ({ product}) => {
  
 const{id,url,title,description,price}=product;


  return (
    <Link to={`/product/${id} `} className="">
            <div className={`w-[300px] pb-5 rounded-2xl`}>
              <figure className=" h-[320px] rounded-2xl overflow-hidden">
                <img src={url} alt="" className="imghover"/>
              </figure>
              <p className="text-start pl-3 pt-3 font-bold text-lg">
                {title}{" "}
              </p>
              <p className="text-start pl-3 pt-3 text-sm font-bold">
                {description}
              </p>
              <div className="flex justify-between mt-7 ml-3">
                <div className="border p-2 rounded-lg">₹ {price}</div>
                <div className="mr-3 mt-1 border rounded-xl p-2 hover:bg-black hover:text-white cursor-pointer">
                  <FiShoppingBag className="text-xl" />
                </div>
              </div>
            </div>
          </Link>
    
  );
};

export default AllProduct;
