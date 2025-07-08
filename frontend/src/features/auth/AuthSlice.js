import { createAsyncThunk } from "@reduxjs/toolkit";
import { refreshAccessToken } from "../../axios/connection";


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




