import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

const BestSellingProduct = ({ allproduct }) => {
  return (
    <>
      {allproduct.map((product, index) => {
        return (
          <Link to={`/product/:${product.id}`}>
            <div className="w-[350px] pb-5 " key={index}>
              <figure className="h-[370px] rounded-2xl overflow-hidden">
                <img src={product.url} alt="" />
              </figure>
              <p className="text-start pl-3 pt-3 font-bold text-lg">
                {product.title}{" "}
              </p>
              <p className="text-start pl-3 pt-3 text-sm font-bold">
                {product.description}
              </p>
              <div className="flex justify-between mt-7 ml-3">
                <div className="border p-2 rounded-lg">₹ {product.price}</div>
                <div className="mr-3 mt-1 border rounded-xl p-2 hover:bg-black hover:text-white cursor-pointer">
                  <FiShoppingBag className="text-xl" />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default BestSellingProduct;
