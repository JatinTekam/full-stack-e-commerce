import React from "react";
import { bestSelling } from "../assets/image.js";
import BestSellingProduct from "./BestSellingProduct.jsx";


const BestSelling = () => {
 

  return (
    <div className="h-[300px] text-center">
      <h2 className="pt-12 text-3xl font-bold">
        <i>Best selling</i>
      </h2>
      <p className="mt-2 text-lg">
        Stay cozy and stylish with our exclusive collection of best-selling
        hoodies !
      </p>
      <div className="pb-3 pt-7 flex justify-center gap-5">
       <BestSellingProduct allproduct={bestSelling}/>
      </div>
    </div>
  );
};

export default BestSelling;
