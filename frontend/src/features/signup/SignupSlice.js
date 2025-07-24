import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRegister } from "../../axios/connection";

export const UserSignUp = createAsyncThunk(
  "auth/userSignUp",
  async (user, { rejectWithValue }) => {
     try {
    const response = await userRegister(user);
    console.log(response.data);
    
    return response.data;
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

const signUpSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(UserSignUp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(UserSignUp.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });

    builder.addCase(UserSignUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default signUpSlice.reducer;
