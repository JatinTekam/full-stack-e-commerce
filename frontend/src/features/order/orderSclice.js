import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRegister } from "../../axios/connection";

export const orderProduct = createAsyncThunk(
  "order/orderProduct",
  async ({products,email}, { rejectWithValue }) => {

    console.log({...products,email});
    
     try {
  } catch (error) {
    return rejectWithValue({
      message: error.response?.data?.message || "Registration failed",
      status: error.response?.status,
      data: error.response?.data
    });
  }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const order = createSlice({
  name: "order",
  initialState,

//   extraReducers: (builder) => {
//     builder.addCase(UserSignUp.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });

//     builder.addCase(UserSignUp.fulfilled, (state, action) => {
//       state.loading = false;
//       state.user = action.payload;
//     });

//     builder.addCase(UserSignUp.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//   },
});

export default order.reducer;
