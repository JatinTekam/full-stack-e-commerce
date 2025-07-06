import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Search } from "../ProductContext/ProductContext";
import cartGif from "../assets/images/emptyCart.gif"
import CartProduct from "../component/CartProduct";
import { useDispatch, useSelector } from "react-redux";
import { totalCartPrice } from "../features/product/ProductSlice";

const Cart = () => {
  const { showCart, setShowCart, cartItem } = useContext(Search);
  const [totalPrice, setTotalPrice] = useState(0);

  const { products, cartTotalPrice } = useSelector(
    (state) => state.productReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(totalCartPrice());
  }, [products]);

  return (
    <div
      className={`w-130 h-full overflow-scroll bg-white fixed top-0 mobile-width ${
        showCart ? "-right-130" : "-right-0"
      } duration-700`}
    >
      <div
        className="w-15 mt-10 ml-10 p-4 text-2xl border rounded-4xl cursor-pointer"
        onClick={() => setShowCart(!showCart)}
      >
        <FaArrowLeftLong />
      </div>
      {products.length == 0 ? (
        <div className="mt-5">
          <p className="text-center text-2xl font-bold">Your Cart Is Empty</p>
          <div>
          <img src={cartGif} alt="" />
          </div>
        </div>
      ) : (
        <div>
      
          <div className="mt-10 ml-10 flex justify-between">
            <p className="text-xl font-bold">Your Products</p>
            <p className="mr-10 ">
              Total :
              <span className="font-bold text-2xl">{cartTotalPrice}</span>
            </p>
          </div>
          <div className=" mt-3 px-3 py-3">
            {products &&
              products.map((item) => {
                return (
                  <CartProduct
                    item={item}
                    setTotalPrice={setTotalPrice}
                    key={item.id}
                  />
                );
              })}
          </div>
        </div>
      )}

      {/* <p>{displayPrice}</p> */}
    </div>
  );
};

export default Cart;
