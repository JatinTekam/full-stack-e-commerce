import { createContext, useState } from "react";
import {bestSelling} from "../assets/image.js"

export const Search=createContext();

export const MySearchContext=({children})=>{
  const[sreach,setSearch]=useState(false);

  const bestSellingPrtoudct=[
    ...bestSelling
  ]
  
  

    return <Search.Provider value={[sreach,setSearch,bestSellingPrtoudct]}>{children}</Search.Provider>
}