import { allProduct } from "../../assets/products.js";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productData: allProduct,
  cartTotalPrice: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {

    clearCart:(state)=>{
      state.products=[];
      state.cartTotalPrice=0;
    },


    addToCart: (state, action) => {
      const present = state.products.findIndex((item) => {
        return item.id === action.payload.id;
      });
      if (present >= 0) {
        state.products[present].quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },

    totalCartPrice: (state) => {
      let {totalPrice} = state.products.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.totalPrice += itemTotal;
          return cartTotal;
        },
        {
          totalPrice: 0,
        }
      );

      state.cartTotalPrice=parseInt(totalPrice.toFixed(2));
    },

    removeProduct:(state,action)=>{
        state.products=state.products.filter((item)=>item.id!=action.payload)
    },

    increaseQuantity:(state,action)=>{
        if(action.payload.quantity < 10){
            state.products=state.products.map((item)=>{
                if(item.id===action.payload.id){
                    return{...item,quantity:item.quantity+1}
                }
                return item;
            })
    
            
        }
    },

    decreaseQuantity:(state,action)=>{

        if(action.payload.quantity > 1){
            state.products=state.products.map((item)=>{
                if(item.id===action.payload.id){
                    return{...item,quantity:item.quantity-1}
                }
                return item;
            })
        }
    },

  },
});

export const { addToCart, totalCartPrice, removeProduct, increaseQuantity, decreaseQuantity, clearCart } = productSlice.actions;

export default productSlice.reducer;
