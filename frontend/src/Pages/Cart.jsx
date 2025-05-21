import React, { useContext, useEffect } from "react";
import { Search } from "../ProductContext/ProductContext";

const Cart = () => {

  const{showCart,setShowCart}=useContext(Search);



  return (
    <div className={`w-130 h-full bg-white fixed top-0 ${showCart ? "-right-130" : "-right-0"} duration-700`}>
      <h1 className="text-red-600" onClick={()=>setShowCart(!showCart)}>Hello</h1>
    </div>
  );
};

export default Cart;
