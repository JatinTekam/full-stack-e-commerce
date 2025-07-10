import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export const userRegister = async (data) => {
 try {
    const response = await api.post("/signup",data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    throw error; 
  }

};


export const userLogin = async (data) => {
  
 try {
    const response = await api.post("/login",data, {
      withCredentials:true,
      headers: {
        'Content-Type': 'application/json'
      },
      
    });      
    return response;
  } catch (error) {
    throw error; 
  }

};


export const refreshAccessToken = async (accessToken) => {
 try {
   const response = await api.post('/refresh-token',{
    headers:{
       'Authorization': `Bearer ${accessToken}`
    },
     withCredentials: true,
    });
  return response; 
 } catch (error) {
  throw error;
 }
};
