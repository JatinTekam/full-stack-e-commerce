
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Redux/ProductSlice";


export const store=configureStore({
    reducer:{
        productReducer:productReducer
    }
})