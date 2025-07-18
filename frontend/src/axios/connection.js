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

export const getUser = async (data,token) => {
  
 try {
    const response = await api.post("/user",data, {
      withCredentials:true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      
    });      
    return response;
  } catch (error) {
    throw error; 
  }

};


export const refreshAccessToken = async () => {
 try {
   const response = await api.post('/refresh-token',{},{
    headers:{
        'Content-Type': 'application/json',
    },
     withCredentials: true,
    });
  return response; 
 } catch (error) {
  throw error;
 }
};


export const updateDetails=async (updatedData)=>{
  try {
   const response = await api.post('/update-user',updatedData,{
    headers:{
        'Content-Type': 'application/json',
    },
     //withCredentials: true,
    });
  return response; 
 } catch (error) {
  throw error;
 }
}
