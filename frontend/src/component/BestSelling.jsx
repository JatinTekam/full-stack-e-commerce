import React, { useContext, useEffect, useState } from "react";
import { Search } from "../ProductContext/ProductContext.jsx";
import AllProduct from '../component/AllProduct.jsx';

 const BestSelling = () => {
  const{bestSellingPrtoudct} = useContext(Search);
  const[bestProduct,setBestProduct]=useState([]);

  useEffect(()=>{
    setBestProduct(bestSellingPrtoudct.slice(0,4))
  },[])
 
  return (
    <div className=" text-center">
      <h2 className="pt-12 text-4xl font-bold">
        <i>Best selling</i>
      </h2>
      <p className="mt-2 text-lg">
        Stay cozy and stylish with our exclusive collection of best-selling
        hoodies !
      </p>
      <div className="w-full pb-3 pt-7 mb-5 flex flex-wrap justify-center gap-5">
       
        {
          bestProduct.map((product)=>{
           return <AllProduct product={product} key={product.id}/>
          })
        }
      </div>
    </div>
  );
};

export default BestSelling;
