import React, { useContext, useState } from 'react'
import { Search } from '../ProductContext/ProductContext'
import { IoMdArrowDropdown } from "react-icons/io";

const Collection = () => {

  const{bestSellingPrtoudct}=useContext(Search);
 const[showFilter,setShowFilter]=useState(false);
  
  
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-5 pl-13 border-t'>
        <div className='min-w-60 mb-5'>
          <p className='font-serif text-xl flex '>Filter
           <div className=''><IoMdArrowDropdown className={`sm:hidden mt-1 ${showFilter ? 'rotate-180' : ''}`}/></div>
          </p>
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
            <p className='mb-3 text-sm font-medium'>Categories</p>
            <div className='flex flex-col gap-2 test-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type="checkbox" className='w-3'value={`Men`}/>Men
              </p>
              <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={`Women`}/>Women
              </p>
            </div>
          </div>


          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
            <p className='mb-3 text-sm font-medium'>Type</p>
            <div className='flex flex-col gap-2 test-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type="checkbox" className='w-3'value={`Topwear`}/>Topwear
              </p>
              <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={`Bottomwear`}/>Bottomwear
              </p>
            </div>
          </div>

        </div>
    </div>
  )
}

export default Collection