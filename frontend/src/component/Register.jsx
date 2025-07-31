import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex">
      <div>
        <div className=" rounded-[16px]">
          <button className="group p-[4px] cursor-pointer ">
            <div className=" border-1 rounded-[8px] px-3 py-2  text-black border-white bg-white">
             <Link to="/login">
             <div className="">
                <span className="font-semibold ">Log in</span>
              </div>
             </Link>
            </div>
          </button>
        </div>
      </div>
      
      <div>
        <div className=" rounded-[16px]">
          <button className="group p-[4px] cursor-pointer rounded-[12px]  ">
            <div className="rounded-[8px] px-2 py-2 border-1   text-white border-white">
              <Link to="/signup">
              <div>
                <span className="font-semibold">Sign up</span>
              </div>
              </Link>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
