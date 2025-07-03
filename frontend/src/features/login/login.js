import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../../axios/connection";



export const loginUser = createAsyncThunk(
 "login/loginUser",
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


    // try {
    //   const response = await userLogin(user);
    //   //console.log(user);

    //   console.log(response.data);
      
    //   //return response.data;
    // } catch (error) {
    //   console.log(error);
    //   return ({
    //     message: error.response?.data?.message || "Login failed",
    //     status: error.response?.status,
    //     data: error.response?.data,
    //   });
      
    // }
);


const initialState = {
  user: null,
  loading: false,
  error: null,
};


const logInSlice = createSlice({
  name: "login",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default logInSlice.reducer;


