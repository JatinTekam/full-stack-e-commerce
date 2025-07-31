import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}`
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
      // withCredentials:true,
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


// export const refreshAccessToken = async () => {
//  try {
//    const response = await api.post('/refresh-token',{},{
//     headers:{
//         'Content-Type': 'application/json',
//     },
//      withCredentials: true,
//     });
//   return response; 
//  } catch (error) {
//   throw error;
//  }
// };


export const updateDetails=async (updatedData,token)=>{
  try {
   const response = await api.put('/update-user',updatedData,{
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    });
  return response; 
 } catch (error) {  
  throw error;
 }
}

export const placeOrder=async(userOrder,token)=>{
 try{
    const response = await api.post('/orders/place-order',userOrder,{
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    });
  return response; 
 }catch(error){
    throw error;
 }
}


export const verifyUserPayment=async(paymentData,token)=>{
 try{
    const response = await api.post('/orders/verify',paymentData,{
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    });
  return response; 
 }catch(error){
    throw error;
 }
}

export const deleteUserProduct=async(id,token)=>{ 
 try{
    const response = await api.delete(`/orders/${id}`,{
    headers:{
        'Authorization': `Bearer ${token}`
    },
    });
  return response; 
 }catch(error){
    throw error;
 }
}


export const userProduct=async(id,token)=>{ 
 try{
    const response = await api.get(`/orders/order/${id}`,{
    headers:{
        'Authorization': `Bearer ${token}`
    },
    });
  return response; 
 }catch(error){
    throw error;
 }
}
