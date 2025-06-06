import React, { useContext, useEffect, useState } from "react";
import { Search } from "../ProductContext/ProductContext";
import { IoMdArrowDropdown } from "react-icons/io";
import AllProduct from "../component/AllProduct";
import { useSelector } from "react-redux";

const Collection = () => {
  const products=useSelector((state)=>state.productReducer.productData);
  const [showFilter, setShowFilter] = useState(false);
  const [collectionProduct, setcollectionProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortPorduct, setSortProduct] = useState("relavent");


  const handleCategories = (e) => {
    if (categories.includes(e.target.value)) {
      setCategories((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategories((prev) => [...prev, e.target.value]);
    }
  };


  const filterProduct=()=>{
    let copyProduct=products.slice();
    if(categories.length > 0){
      copyProduct=copyProduct.filter(item=>categories.includes(item.category))
    }
    setcollectionProduct(copyProduct);
    
  }


  const sortMyProduct = () => {

    const filterProd=collectionProduct.slice();
    
    switch (sortPorduct) {
      case "low-high":
        setcollectionProduct(
          filterProd.sort(
            (product1, product2) => product2.price + product1.price
          )
        )    
        
        
        break;
      case "high-low":
        setcollectionProduct(
          filterProd.sort(
            (product1, product2) => product2.price - product1.price
          )
        );
       
        break;
      default:
        filterProduct();
    }

  };

  useEffect(()=>{
    filterProduct();
  },[categories])


  useEffect(()=>{
    sortMyProduct();
  },[sortPorduct])


  return (
    <div className="w-full relative flex flex-col sm:flex-row gap-1 sm:gap-10 pt-5 pl-13 border-t pl-mobile ">
      <div className="min-w-60 mb-5 ">
        <div
          className="font-serif text-xl flex cursor-pointer"
          onClick={() => setShowFilter(!showFilter)}
        >
          Filter
          <div className="">
            <IoMdArrowDropdown
              className={`sm:hidden mt-1 ${showFilter ? "rotate-180" : ""}`}
            />
          </div>
        </div>
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Categories</p>
          <div className="flex flex-col gap-2 test-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={`Men`}
                onChange={handleCategories}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={`Women`}
                onChange={handleCategories}
              />
              Women
            </p>
          </div>
        </div>

       
      </div>

      <div className="flex-1">
        <div className="title w-[95%] flex justify-between ">
          <h2 className="text-3xl">All Collections</h2>
          <select
            name=""
            id=""
            className="border-2 rounded-sm border-gray-300 text-sm px-2 py-2 h-9 "
            onChange={(e)=>setSortProduct(e.target.value)}
          >
            <option value="relavent">Sort By: Relavent</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        <div className="flex flex-wrap justify-around gap-y-5 pt-5">
          {collectionProduct.map((product, index) => {
            return <AllProduct product={product} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
