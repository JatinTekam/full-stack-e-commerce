import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUserProduct } from "../../axios/connection";



export const deleteProduct = createAsyncThunk(
 "deleteProduct",
 async({orderId,accessToken},{ rejectWithValue })=>{

   try {
      const response = await deleteUserProduct(orderId, accessToken); 
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Payment failed",
        status: error.response?.status,
        data: error.response?.data
      });
    }
    }
);

const initialState = {
  deleteStatus: null,
  loading: false,
};

const deleteOrder = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.deleteStatus = null;
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteStatus = 200;
    });

    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.deleteStatus = 404;
    });
  },
});

export default deleteOrder.reducer;

