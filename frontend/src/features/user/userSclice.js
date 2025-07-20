import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../axios/connection";




export const userInfo = createAsyncThunk(
 "userSlice/User",
 async({username,accessToken},{ rejectWithValue })=>{

  const userDetails={
    username:username
  }

   try {
      const response = await getUser(userDetails, accessToken); 
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
  name: null,
  email: null,
  phoneNumber: null,
  username: null,
  address: null,
  error: null,
};



const userSlice = createSlice({
  name: "user",
  initialState,

 extraReducers: (builder) => {
  builder.addCase(userInfo.pending, (state) => {
     state.error = null;
   });
   builder.addCase(userInfo.fulfilled, (state, action) => {
     state.name=action.payload.name;
     state.email = action.payload.email;
     state.error = null;
     state.phoneNumber= action.payload.phoneNumber;
     state.username= action.payload.username;
     state.address= action.payload.address;
   });
   builder.addCase(userInfo.rejected, (state, action) => {
    state.name= null;
     state.error = action.payload.error;
     state.email = null;
      state.phoneNumber=null;
     state.username= null;
     state.address=null;
   });

 }
});

export default userSlice.reducer;