import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateDetails, userRegister } from "../../axios/connection";

export const updateUserDetails = createAsyncThunk(
  "update/updateUser",
  async (user, { rejectWithValue }) => {
     try {    
    const response = await updateDetails(user);
    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: error.response?.data?.message || "Data not updated due to error",
      status: error.response?.status,
      data: error.response?.data
    });
  }
  }
);

const initialState = {
  message: null,
  loading: false,
  error: null,
};

const updateUserData = createSlice({
  name: "updateUser",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(updateUserDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message=null;
    });

    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error=null;
    });

    builder.addCase(updateUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message=action.payload.message;
    });
  },
});

export default updateUserData.reducer;
