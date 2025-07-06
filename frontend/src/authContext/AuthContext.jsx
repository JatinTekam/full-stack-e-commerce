import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const[accessToken,setAccessToken]=useState(true);
    const[user,setUser]=useState(null);
    const[authenticated,setAuthenticated]=useState(null);

    const contextData={
        accessToken,
        setAccessToken,
        user,
        setUser,
        authenticated,
        setAuthenticated
    }



  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
