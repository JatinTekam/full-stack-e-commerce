import { createContext, useState } from "react";


export const Search=createContext();

export const MySearchContext=({children})=>{
  const[sreach,setSearch]=useState(false);

    return <Search.Provider value={[sreach,setSearch]}>{children}</Search.Provider>
}