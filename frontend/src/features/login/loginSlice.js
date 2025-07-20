import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../../axios/connection";



const initialState = {
  username: null,
  email: null,
  loading: false,
  error: null,
  accessToken: null,
  expiresIn: null,
  message: null,
  status: null,
  isLoggedIn: false,
};


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



export const refreshUser = createAsyncThunk(
  "login/refreshSlice",
  async (_, { rejectWithValue }) => {
    try {
      const response = await refreshAccessToken();    
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
  name: "authSlice",
  initialState,

 extraReducers: (builder) => {
  builder.addCase(loginUser.pending, (state) => {
     state.loading = true;
     state.error = null;
   });
   builder.addCase(loginUser.fulfilled, (state, action) => {
     state.username=action.payload.username;
     state.email = action.payload.email;
     state.loading = false;
     state.error = null;
     state.accessToken = action.payload.accessToken;
     state.expiresIn = action.payload.expiresIn;
     state.message= action.payload.message;
     state.status=action.payload.status;
     state.isLoggedIn= true;
   });
   builder.addCase(loginUser.rejected, (state, action) => {
    state.username= null;
     state.loading = false;
     state.error = action.payload;
     state.user = null;
     state.accessToken = null;
      state.expiresIn = null;
     state.message=action.payload.message;
     state.isLoggedIn= false;
      state.status=null;
   });

    builder.addCase(refreshUser.fulfilled, (state, action) => {
     state.username= action.payload.username;
     state.loading = false;
     state.error = null;
     state.accessToken = action.payload.accessToken;
      state.expiresIn = action.payload.expiresIn;
     state.email= action.payload.email;
     state.isLoggedIn= true;
   });
 }
});

export default logInSlice.reducer;


