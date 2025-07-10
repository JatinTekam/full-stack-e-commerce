import React, {useEffect, useState } from "react";
import AllProduct from "./AllProduct";
import { useSelector } from "react-redux";

const FreshArrival = () => {
  const products=useSelector((state)=>state.productReducer.productData);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setProduct(products.slice(0,16));
  }, []);


  

  
  return (
    <div>
      <h2 className="pt-12 mb-2 text-4xl font-bold text-center">
        <i>Fresh arrivals and new selections.</i>
      </h2>
      <p className="mt-2 text-lg text-center">
        Stay cozy and stylish with our exclusive collection of best-selling
        hoodies !
      </p>
      <div className="w-full  pb-3 pt-7 flex flex-wrap justify-center gap-15 ">
       {
         product.map((product)=>{
          return <AllProduct product={product} key={product.id}/>
         })
       }
     </div>
    </div>
  );
};

export default FreshArrival;
