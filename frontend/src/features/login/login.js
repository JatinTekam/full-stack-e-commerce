import { userLogin } from "../../axios/connection";


export const loginUser = async (user) => {
  try {
    const response = await userLogin(user);
    console.log(response.data);
    
    //return response.data;
  } catch (error) {
    // return rejectWithValue({
    //   message: error.response?.data?.message || "Registration failed",
    //   status: error.response?.status,
    //   data: error.response?.data,
    // });
    console.log(error);
    
  }
};
