import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const[userAccessToken,setUserAccessToken]=useState(null);
    const[user,setUser]=useState(null);
    const[authenticated,setAuthenticated]=useState(null);

    const contextData={
        userAccessToken,
        setUserAccessToken,
        user,
        setUser,
        authenticated,
        setAuthenticated
    }



  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
