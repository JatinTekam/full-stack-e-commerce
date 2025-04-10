import { createContext, useState } from "react";
import {allProduct} from "../assets/image.js"

export const Search=createContext();

export const MySearchContext=({children})=>{
  const[sreach,setSearch]=useState(false);

  const bestSellingPrtoudct=[
    ...allProduct
  ]
  
  

    return <Search.Provider value={[sreach,setSearch,bestSellingPrtoudct]}>{children}</Search.Provider>
}