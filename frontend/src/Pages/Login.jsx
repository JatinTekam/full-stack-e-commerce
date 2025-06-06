import React from "react";
import Signup from "./Signup";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import img1 from "../assets/images/img3.jpg";

const Login = () => {
  return (
    <div className="w-full h-screen  flex justify-center items-center relative bg-black">
      <div className="w-80 h-screen absolute left-0 top-0 opacity-40">
        <img
          src={img1}
          alt=""
          srcset=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-180 flex justify-around border p-3 rounded-2xl bg-white opacity-70">
        <div className="w-80 rounded-xl overflow-hidden">
          <img src={img1} alt="" className="w-full" />
        </div>
        <form action="" className="w-80 flex flex-col gap-2 ">
          <h1 className="text-center text-3xl mb-5">
            <i>Log in</i>
          </h1>
          
          <label htmlFor="username">Username</label>
          <input type="text" id="username" className="border-b outline-none" />
          <label htmlFor="password">Password</label>
          <input type="text" id="password" className="border-b outline-none" />

          <div class=" w-fullflex justify-center items-center gap-12 mt-2 ">
            <div class=" rounded-[16px]">
              <button className=" w-full bg-blue-500 p-2 text-white cursor-pointer rounded-[12px] hover:shadow-black flex items-center gap-2 justify-center">
                Log in <FaArrowRightLong className="mt-1" />
              </button>
            </div>
          </div>
          <p className="text-center">
            Don't Have An Account ?
            <Link to="/signup">
              <span className="text-blue-500 hover:cursor-pointer"> Sign up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
