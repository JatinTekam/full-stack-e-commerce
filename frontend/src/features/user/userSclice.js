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
  firstName: null,
  lastName:null,
  zipCode:null,
  state:null,
  city:null,
  email: null,
  phoneNumber: null,
  username: null,
  address: null,
  error: null,
};



const userSlice = createSlice({
  name: "user",
  initialState,


   reducers:{
    clearUser:(state)=>{
        state.firstName=null,
        state.lastName= null,
        state.zipCode=null,
        state.state=null,
        state.city=null,
        state.email=null,
        state.phoneNumber=null,
        state.username=null,
        state.address=null,
        state.error=null
    }
  },

 extraReducers: (builder) => {
  builder.addCase(userInfo.pending, (state) => {
     state.error = null;
   });
   builder.addCase(userInfo.fulfilled, (state, action) => {
     state.firstName=action.payload.firstName;
     state.lastName=action.payload.lastName;
     state.email = action.payload.email;
     state.error = null;
     state.phoneNumber= action.payload.phoneNumber;
     state.username= action.payload.username;
     state.address= action.payload.address;
     state.state=action.payload.state;
     state.city=action.payload.city;
     state.zipCode=action.payload.zipCode;
   });
   builder.addCase(userInfo.rejected, (state, action) => {
    state.firstName= null;
    state.lastName=null;
     state.error = action.payload.error;
     state.email = null;
      state.phoneNumber=null;
     state.username= null;
     state.address=null;
      state.state=null;
     state.city=null;
     state.zipCode=null;
   });

 }
});

export const {clearUser}=userSlice.actions;

export default userSlice.reducer;