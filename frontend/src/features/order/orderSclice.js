import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { placeOrder } from "../../axios/connection";


export const orderProduct = createAsyncThunk(
  "order/orderProduct",
  async ({userOrder,accessToken}, { rejectWithValue }) => {  
     try {

    const response= await placeOrder(userOrder,accessToken)
    return response.data;
  } catch (error) {    
    return rejectWithValue({
      message: error.response?.data?.message || "Order failed",
      status: error.response?.status,
      data: error.response?.data
    });
  }
  }
);

const initialState = {
  userOrders: {},
  loading: false,
  error: null,
};

const order = createSlice({
  name: "order",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(orderProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.userOrders=null;
    });

    builder.addCase(orderProduct.fulfilled, (state, action) => {
      state.loading = false; 
      state.error=null;
     state.userOrders=action.payload;
    });

    builder.addCase(orderProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      state.userOrders=null
    });
  },
});

export default order.reducer;
