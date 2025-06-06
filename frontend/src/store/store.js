import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/ProductSlice";
import signUpReducer from "../features/signup/SignupSlice";





export const store = configureStore({
  reducer: {
    productReducer: productReducer,
    auth: signUpReducer,
  },
});
