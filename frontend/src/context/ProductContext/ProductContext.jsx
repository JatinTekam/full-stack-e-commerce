import { createContext, useState } from "react";


export const Search=createContext();

export const MySearchContext=({children})=>{
  const[search,setSearch]=useState(false);
  const[showCart,setShowCart]=useState(true);
  const[cartItem,setcartItem]=useState([]);


    return <Search.Provider value={{search,setSearch,showCart,setShowCart,cartItem,setcartItem}}>{children}</Search.Provider>
}