import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex">
      <div>
        <div className=" rounded-[16px]">
          <button className="group p-[4px] cursor-pointer ">
            <div className=" border bg-amber-50 rounded-[8px] px-2 py-2 text-black">
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
            <div className="bg-transparent rounded-[8px] px-2 py-2 border text-white">
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
