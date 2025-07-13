import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/ProductSlice";
import signUpReducer from "../features/signup/SignupSlice";
import logInReducer from "../features/login/loginSlice";

export const store = configureStore({
  reducer: {
    productReducer: productReducer,
    auth: signUpReducer,
    login: logInReducer,
    //refreshToken: refreshReducer
  },
});
