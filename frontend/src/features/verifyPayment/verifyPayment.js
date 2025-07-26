import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { verifyUserPayment } from "../../axios/connection";


export const verifyPayment = createAsyncThunk(
 "userPayment",
 async({paymentData,accessToken},{ rejectWithValue })=>{

   try {
      const response = await verifyUserPayment(paymentData, accessToken); 
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
  status: null,
  loading: false,
};

const userPayment = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(verifyPayment.pending, (state) => {
      state.loading = true;
      state.status = null;
    });

    builder.addCase(verifyPayment.fulfilled, (state, action) => {
      state.loading = false;
      state.state = 200;
    });

    builder.addCase(verifyPayment.rejected, (state, action) => {
      state.loading = false;
      state.status = 404;
    });
  },
});

export default userPayment.reducer;

