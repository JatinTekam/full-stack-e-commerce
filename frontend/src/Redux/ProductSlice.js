import { allProduct } from "../assets/image"
import {createSlice} from "@reduxjs/toolkit"

const initialState={
    product:[...allProduct]
};


const productSlice=createSlice({
    name:"product",
    initialState,
    reducers:{
        showInitialProduct:(state)=>{
            this.product
        }
    }
})

export const{showInitialProduct}=productSlice.actions;

export default productSlice.reducer;


