import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import img1 from "../assets/images/img2.jpg";
import img2 from "../assets/images/img3.jpg";

const Rive = () => {
  return (
    <div className="w-200 h-50 relative text-white text-center hidden 2xl:block">
      <h1 className="text-4xl pb-2">Rive</h1>
      <div className="absolute -top-50 w-50 z-0 opacity-55 left-10">
        <img src={img1} alt="" />
      </div>
      <h2 className="text-md relative font-bold">
        <i>Where style meets expression, trends inspire, and fashion thrives ❤️</i>
      </h2>
      <div className="absolute w-50 top-2 z-0 opacity-55 right-2">
        <img src={img2} alt="" />
      </div>
      <div className="flex mt-7 justify-center gap-3 text-2xl text-center mb-2 ">
        <FaFacebookSquare className="hover:cursor-pointer hover:text-blue-700"/>
        <IoLogoInstagram className="hover:cursor-pointer hover:text-red-500"/>
      </div>
      <i><p className="text-white mt-20 text-start ml-9 text-3xl">"Beyond the trend, beyond the ordinary”</p></i>
    </div>
  );
};

export default Rive;
