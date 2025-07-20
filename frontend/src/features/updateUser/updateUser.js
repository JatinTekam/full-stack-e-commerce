import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateDetails, userRegister } from "../../axios/connection";

export const updateUserDetails = createAsyncThunk(
  "update/updateUser",
  async ({userUpdateData,accessToken}, { rejectWithValue }) => {
     try {    
    const response = await updateDetails(userUpdateData,accessToken);
    return response.data;
  } catch (error) { 
    return rejectWithValue({
      error: error.response?.data?.error || "Data not updated due to error",
      status: error.response?.status,
      data: error.response?.data
    });
  }
  }
);

const initialState = {
  message: null,
  loading: false,
  errorMessage: null,
  status: null
};

const updateUserData = createSlice({
  name: "updateUser",
  initialState,


  reducers:{
    clearUserUpdate: (state)=>{
      state.message=null;
      state.loading=false;
      state.errorMessage=null;
      state.status= null
    }
  },

  extraReducers: (builder) => {
    builder.addCase(updateUserDetails.pending, (state) => {
      state.loading = true;
      state.errorMessage = null;
      state.message=null;
      state.status=null
    });

    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.errorMessage=null;
      state.status=action.payload.status;
    });

    builder.addCase(updateUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload?.error || "Update failed";
      state.message=null;
      state.status=action.payload.status;
    });
  },
});

export const {clearUserUpdate}=updateUserData.actions;

export default updateUserData.reducer;
