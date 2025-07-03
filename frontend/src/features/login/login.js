import { createAsyncThunk } from "@reduxjs/toolkit";
import { userLogin } from "../../axios/connection";

export const loginUser = async(user)=>{
    try {
      const response = await userLogin(user);
      //console.log(user);

      console.log(response.data);
      
      //return response.data;
    } catch (error) {
      console.log(error);
      return ({
        message: error.response?.data?.message || "Login failed",
        status: error.response?.status,
        data: error.response?.data,
      });
      
    }
};
