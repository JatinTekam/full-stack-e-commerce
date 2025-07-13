// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { refreshAccessToken } from "../../axios/connection";


// export const refreshUser = createAsyncThunk(
//   "login/refreshSlice",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await refreshAccessToken();    
//       return response.data;
//     } catch (error) {      
//       return rejectWithValue({
//         message: error.response?.data?.message || "Session expired",
//         status: error.response?.status,
//       });
//     }
//   }
// );

// const initialState = {
//   refreshEmail: null,
//   error: null,
//   refreshAccessToken: null,
//   loggedIn: false,
// };


// const refreshSlice = createSlice({
//   name: "refreshSlice",
//   initialState,

//  extraReducers: (builder) => {
//    builder.addCase(refreshUser.fulfilled, (state, action) => {
//      state.refreshEmail = action.payload.email;
//      state.error = null;
//      state.refreshAccessToken=action.payload.accessToken;
//      state.loggedIn= true;
//    });
//    builder.addCase(refreshUser.rejected, (state, action) => {
//      state.error = action.payload;
//      state.refreshEmail = null;
//      state.refreshAccessToken = null;
//      state.loggedIn= false;
//    });
//  }
// });

// export default refreshSlice.reducer;
