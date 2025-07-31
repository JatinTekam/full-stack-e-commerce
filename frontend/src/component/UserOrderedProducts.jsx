import React, { useEffect, useState } from "react";
import { allProduct } from "../assets/products.js";


const UserOrderedProducts = ({ product, status, paymentStatus, shippingTo}) => {
   
  return (
    <div className="w-full flex gap-2 mb-3">
      {allProduct.map((item) =>
        item.id == product.productId ? (
          <div className="w-30" key={product.productId}>
            <img src={item.url} alt="" className="object-contain" />
          </div>
        ) : (
          ""
        )
      )}
      <div className="w-170">
        <p className="text-xl">{product.title}</p>

        <div className="w-full  flex gap-5">
        <p className="text-md">
          Category:- <span className="font-bold">{product.category}</span>
        </p>
        <p className="text-md">
          Color:- <span className="font-bold">{product.color}</span>
        </p>
        <p className="text-md">
          Size:- <span className="font-bold">{product.size}</span>
        </p>
        <p className="text-md">
          rating:- <span className="font-bold">{product.rating}</span>
        </p>
      
        <p className="text-md">
          Price:-{" "}
          <span className="font-bold">
            ₹ {product.price} X {product.quantity}
          </span>
        </p>
        </div>
        <p className="text-md">
          Status:- <span className="font-bold">{status}</span>
        </p>
        <p className="text-md">
          Payment Status:- <span className="font-bold text-green-700">{paymentStatus}</span>
        </p>
          <p className="text-md">
          Shipping Address:- <span className="font-bold">{shippingTo}</span>
        </p>
      </div>
    </div>
  );
};

export default UserOrderedProducts;
