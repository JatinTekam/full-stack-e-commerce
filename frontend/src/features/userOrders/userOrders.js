import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userProduct } from "../../axios/connection";


export const getUserOrders = createAsyncThunk(
 "userOrders",
 async({id,accessToken},{ rejectWithValue })=>{

   try {
      const response = await userProduct(id, accessToken); 
      return {
        ...response.data
      };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Cant't fetch data due to error",
        status: error.response?.status,
        data: error.response?.data
      });
    }
    }
);

const initialState = {
  orders:[],
};

const userOrders = createSlice({
  name: "userOrders",
  initialState,

  reducers:{
    clearUserOrder:(state)=>{
        state.orders=[]
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getUserOrders.pending, (state) => {
      state.orders=[]
    });

    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.orders=action.payload;
    });

    builder.addCase(getUserOrders.rejected, (state, action) => {
       state.orders=[]
    });
  },
});


export const {clearUserOrder}=userOrders.actions;

export default userOrders.reducer;

