import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/ProductSlice";
import signUpReducer from "../features/signup/SignupSlice";
import logInReducer from "../features/login/loginSlice";
import userReducer from "../features/user/userSclice"
import updateUserReducer from "../features/updateUser/updateUser"
import orderReducer from "../features/order/orderSclice"
import paymentReducer from "../features/verifyPayment/verifyPayment"
import deleteOrder from "../features/deleteOrder/deleteOrder"

export const store = configureStore({
  reducer: {
    productReducer: productReducer,
    auth: signUpReducer,
    login: logInReducer,
    user : userReducer,
    updateUser: updateUserReducer,
    order: orderReducer,
    payment: paymentReducer,
    deleteOrder: deleteOrder
  },
});
