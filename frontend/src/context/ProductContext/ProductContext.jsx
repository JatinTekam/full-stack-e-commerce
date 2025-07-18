import { createContext, useState } from "react";


export const Search=createContext();

export const MySearchContext=({children})=>{
  const[search,setSearch]=useState(false);
  const[showCart,setShowCart]=useState(true);
  const[cartItem,setcartItem]=useState([]);
  const[updateData,setUpdateData]=useState(false);


    return <Search.Provider value={{search,setSearch,showCart,setShowCart,cartItem,setcartItem,updateData,setUpdateData}}>{children}</Search.Provider>
}