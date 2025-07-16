import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../axios/connection";


export const userInfo = createAsyncThunk(
 "userSlice/User",
 async(user,{ rejectWithValue })=>{
   try {
    console.log(user);
    
      //const response = await getUser(user);     
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
  email: null,
  phoneNo: null,
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
     state.user=action.payload.user;
     state.email = action.payload.email;
     state.error = null;
     state.phoneNo= action.payload.phoneNo;
     state.username= action.payload.username;
     state.address= action.payload.address;
   });
   builder.addCase(userInfo.rejected, (state, action) => {
    state.user= null;
     state.error = action.payload;
     state.email = null;
      state.phoneNo=null;
     state.username= null;
     state.address=null;
   });

 }
});

export default userSlice.reducer;