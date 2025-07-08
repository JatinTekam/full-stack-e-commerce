import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const[accessToken,setAccessToken]=useState(null);
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

export const useAuth = () => useContext(AuthContext);
