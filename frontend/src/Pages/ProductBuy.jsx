import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import CartProduct from "../component/CartProduct";
import UserProduct from "../component/UserProduct";
import { errorMsg, successMsg } from "../utils/messages";
import { orderProduct } from "../features/order/orderSclice";
import loadingGif from "../assets/images/loading.gif";
import { Await, useNavigate } from "react-router-dom";

import {RAZORPAY_KEY} from "../utils/contants";
import { verifyPayment } from "../features/verifyPayment/verifyPayment";
import { clearCart } from "../features/product/ProductSlice";
import { deleteProduct } from "../features/deleteOrder/deleteOrder";

const ProductBuy = () => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    city,
    state,
    zipCode,
    address,
  } = useSelector((state) => state.user);
  const { accessToken, id } = useSelector((state) => state.login);
  const [userOrderDetails, setUserOrderDetails] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    city: city,
    state: state,
    zipCode: zipCode,
    address: address,
  });
  const { products, cartTotalPrice } = useSelector(
    (state) => state.productReducer
  );

  const { userOrders, error, loading } = useSelector((state) => state.order);

  const { status} = useSelector((state) => state.payment);

  const {deleteStatus}= useSelector(state=>state.deleteOrder);

  const dispatch = useDispatch();
  const navigate= useNavigate();

  const handleUserOrder = async () => {

    const userOrder = {
      userId: id,
      userAddress: `${firstName} ${lastName}, ${address}, ${city} ${state}, ${zipCode}`,
      phoneNumber: phoneNumber,
      email: email,
      orderedProduct: products.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        category: product.category,
        url: "",
        price: product.price,
        title: product.title,
        size: product.size,
        rating: product.rating,
        color: product.color,
      })),
      amount: cartTotalPrice,
      orderStatus: "In proccess",
    };

    dispatch(orderProduct({ userOrder, accessToken }));

try {
   
    const result = await dispatch(orderProduct({ userOrder, accessToken })).unwrap();
    
    if (result && result.razorpayOrderId) {
      initiateRazorpayPayment(result);
    } else {
      errorMsg("Failed to create order");
    }
  } catch (error) {
    console.error("Order placement failed:", error);
    errorMsg(error);
    navigate("/login");
  }
  };


  const initiateRazorpayPayment=(order)=>{
        const options={
            key: RAZORPAY_KEY,
            amount: order.amount,
            currency: "INR",
            name: "Rive",
            description: "Cloths Order Payment",
            order_id: order.razorpayOrderId,
            handler: function(razorpayResponse){
                verifyPayemnt(razorpayResponse);
            },
            prefill:{
                name: `${firstName} ${lastName}`,
                email: email,
                contact: phoneNumber,
            },
            theme: {color:"#3399cc"},
            modal: {
                ondismiss: async function(){
                    errorMsg("Payment cancelled");
                   await deleteOrder(order.id);
                },
            },
        };

        const razorPay=new window.Razorpay(options);

        razorPay.open();
  };

  const verifyPayemnt= (razorpayResponse)=>{

    const paymentData={
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_order_id: razorpayResponse.razorpay_order_id,
        razorpay_signature: razorpayResponse.razorpay_signature
    };

    dispatch(verifyPayment({paymentData,accessToken}));

    if(state===200){
        successMsg("Payment successful");
        dispatch(clearCart());
        navigate("/profile");
    }else{
        errorMsg("Payment failed. Please try again");
        navigate("/");
    }
  }

  const deleteOrder=async (orderId)=>{

    dispatch(deleteProduct({orderId,accessToken}))

    if(deleteStatus==404){
        errorMsg("Something went wrong. contact rive@support.com");
        navigate("/");
        return;
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#eeeeee] ">
      <div className="w-270 bg-white flex p-2 rounded-xl">
        <div className=" h-150 pl-2  p-3 ">
          <h2 className="font-bold text-2xl mb-5 font-mono">Checkout</h2>
          <h3 className="font-bold mb-5 flex text-xl gap-2 items-center font-mono">
            Shipping Information{" "}
            <MdOutlineShoppingCartCheckout className="text-2xl" />
          </h3>
          <label htmlFor="" className="font-bold font-mono">
            Full name
          </label>
          <div className="mt-2 mb-2">
            <input
              type="text"
              className="border p-1 rounded w-full font-mono outline-none"
              value={firstName + " " + lastName}
              readOnly
              style={{ borderColor: "rgb(0,0,0,0.6)" }}
            />
          </div>
          <label htmlFor="" className="font-bold font-mono">
            Email
          </label>
          <div className="mt-2 mb-2">
            <input
              type="text"
              className="border p-1 rounded w-full font-mono outline-none"
              value={email}
              readOnly
              style={{ borderColor: "rgb(0,0,0,0.6)" }}
            />
          </div>

          <label htmlFor="" className="font-bold font-mono">
            Phone number
          </label>
          <div className="mt-2 mb-2">
            <input
              type="text"
              className="border p-1 rounded w-full font-mono outline-none"
              value={phoneNumber}
              readOnly
              style={{ borderColor: "rgb(0,0,0,0.6)" }}
            />
          </div>

          <label htmlFor="" className="font-bold font-mono">
            Address
          </label>
          <div className="mt-2 mb-2">
            <textarea
              type="text"
              className="border p-1 rounded w-full font-mono outline-none"
              required
              value={address}
              readOnly
              style={{ borderColor: "rgb(0,0,0,0.6)" }}
            />
          </div>

          <div className="flex gap-5 mt-3">
            <div>
              <p className="font-bold font-mono">City</p>
              <input
                type="text"
                className="border p-1 rounded w-full font-mono outline-none"
                required
                value={city}
                readOnly
                style={{ borderColor: "rgb(0,0,0,0.6)" }}
              />
            </div>
            <div>
              <p className="font-bold font-mono">State</p>
              <input
                type="text"
                className="border p-1 rounded w-full font-mono outline-none"
                required
                value={state}
                readOnly
                style={{ borderColor: "rgb(0,0,0,0.6)" }}
              />
            </div>
            <div>
              <p className="font-bold font-mono">Zip Code</p>
              <input
                type="text"
                className="border p-1 rounded w-full font-mono outline-none"
                required
                value={zipCode}
                readOnly
                style={{ borderColor: "rgb(0,0,0,0.6)" }}
              />
            </div>
          </div>
        </div>
        <div className="w-150 h-150 overflow-y-scroll  border-l">
          <div className=" mt-3 px-3 py-3">
            {products.map((product) => {
              return <UserProduct product={product} key={product.id} />;
            })}
          </div>
          <div className="flex justify-center ">
            <button
              className="border w-70 text-center px-2 py-2 bg-blue-500 hover:shadow-xl text-white rounded-md cursor-pointer"
              onClick={handleUserOrder}
            >
              {loading ? (
                <p className="flex justify-center gap-2">
                  Please Wait <img src={loadingGif} alt="" className="w-5" />
                </p>
              ) : (
                <p className="text-center">
                  Pay Now ₹ {cartTotalPrice}
                </p>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProductBuy;
