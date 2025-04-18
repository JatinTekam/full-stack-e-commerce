import { createContext, useState } from "react";
import {allProduct} from "../assets/image.js"

export const Search=createContext();

export const MySearchContext=({children})=>{
  const[search,setSearch]=useState(false);

  const bestSellingPrtoudct=[
    ...allProduct
  ]
  
  

    return <Search.Provider value={{search,setSearch,bestSellingPrtoudct}}>{children}</Search.Provider>
}