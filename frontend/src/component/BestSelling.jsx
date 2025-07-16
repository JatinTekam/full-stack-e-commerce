import React, { useEffect, useState } from "react";
import AllProduct from '../component/AllProduct.jsx';
import { useSelector } from "react-redux";
import { useAuth } from "../authContext/AuthContext.jsx";


 const BestSelling = () => {

  const[bestProduct,setBestProduct]=useState([]);

    const{newAccessToken,setNewAccessToken}=useAuth();
  
  const product=useSelector((state)=>state.productReducer.productData);
 
  

  useEffect(()=>{
    setBestProduct(product.slice(0,4))
  },[])
 
  return (
    <div className=" text-center">
      <h2 className="pt-12 text-4xl font-bold">
        <i>Best selling Products</i>
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
