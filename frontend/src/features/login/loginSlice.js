import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../../axios/connection";
import { refreshAccessToken } from "../../axios/connection";


export const loginUser = createAsyncThunk(
 "logInSlice/loginUser",
 async(user,{ rejectWithValue })=>{
   try {
      const response = await userLogin(user);     
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "User Login failed",
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
  accessToken: null,
  message: null,
  isLoggedIn: false,
  isSignUpAuth: true,
};



export const refreshUser = createAsyncThunk(
  "login/refreshSlice",
  async (_, { rejectWithValue }) => {
    const accessToken=initialState.accessToken;
    try {
      const response = await refreshAccessToken(accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Session expired",
        status: error.response?.status,
      });
    }
  }
);


const logInSlice = createSlice({
  name: "logInSlice",
  initialState,

 extraReducers: (builder) => {
  builder.addCase(loginUser.pending, (state) => {
     state.loading = true;
     state.error = null;
   });
   builder.addCase(loginUser.fulfilled, (state, action) => {
     state.user = action.payload.email;
     state.loading = false;
     state.error = null;
     state.accessToken = action.payload.accessToken;
     state.message=action.payload.message;
     state.isLoggedIn= true;
   });
   builder.addCase(loginUser.rejected, (state, action) => {
     state.loading = false;
     state.error = action.payload;
     state.user = null;
     state.accessToken = null;
     state.message=action.payload.message;
     state.isLoggedIn= false;
   });
 }
});

export default logInSlice.reducer;


