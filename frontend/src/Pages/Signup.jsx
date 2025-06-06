import React, { useEffect, useState } from "react";
import img1 from "../assets/images/img2.jpg";
import img2 from "../assets/images/img3.jpg";
import loadingGif from "../assets/images/loading.gif";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { userSignUpSuccessful, errorFlag } from "../allMessages/messages";
import { UserSignUp } from "../features/signup/SignupSlice"
import { useDispatch, useSelector } from "react-redux";


const Signup = () => {

  const[isSubmitting,setIsSubmiting]=useState(false);

  const{user,loading,error}=useSelector((state)=>state.auth)

  const dispatch=useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = (data) => {
    handleFormSubmit(data)
  };

  const handleFormSubmit = (data) => {
      dispatch(UserSignUp(data));
      setIsSubmiting(true);
  };

  useEffect(()=>{

   if(error){
     return errorFlag(error.message)
   }
   if(user){
      return userSignUpSuccessful(user.message)
   }

  },[error,user])

  useEffect(()=>{

     setTimeout(()=>{
      if(isSubmitSuccessful){
      reset();
      setIsSubmiting(false)
    }
     },2000)

  },[isSubmitSuccessful,reset])

  return (
    <div className="w-full h-screen flex justify-center gap-2 items-center bg-black">
      <div className="h-full flex bg-red-400 opacity-40">
        <img src={img1} alt="" className="w-60 h-full object-cover" />
        <img src={img2} alt="" className="w-70 h-full object-cover" />
        
       
      </div>

      <div className="w-150 flex justify-around border p-5 rounded-2xl bg-white  opacity-70">
        <form
          action=""
          className="w-80 flex flex-col gap-2 "
          onSubmit={handleSubmit(onSubmit)}
          method="post"
        >
          <h1 className="text-center text-3xl mb-5">
            <i>Sign Up</i>
          </h1>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className={`w-full outline-none ${
              errors.name ? "border-b border-b-red-600" : "border-b"
            } `}
            {...register("name", {
              required: "Name Is required",
              minLength: { value: 5, message: "Minimum 5 character required" },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-end text-sm">
              {errors.name.message} *
            </p>
          )}


          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className={`w-full outline-none ${
              errors.email ? "border-b border-b-red-600" : "border-b"
            } `}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-end text-sm">
              {errors.email.message} *
            </p>
          )}


          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
             className={`w-full outline-none ${
              errors.userName ? "border-b border-b-red-600" : "border-b"
            } `}
            {...register("userName", {
              required: "Username is required",
              pattern: {
                value: 5,
                message: "Username must be greater then 5 character",
              },
            })}
          />
          {errors.userName && (
            <p className="text-red-500 text-end text-sm">
              {errors.userName.message} *
            </p>
          )}




          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
             className={`w-full outline-none ${
              errors.password ? "border-b border-b-red-600" : "border-b"
            } `}
            {...register("password", {
              required: "Password is required",
              pattern:{
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                message: "Password should be contain [A-Z,a-z,0-9]",
              }
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-end text-sm">
              {errors.password.message} *
            </p>
          )}



          <label htmlFor="mobile">Mobile no.</label>
          <input
            type="text"
            name="mobileNo"
            id="mobile"
            className={`w-full outline-none ${
              errors.mobileNo ? "border-b border-b-red-600" : "border-b"
            } `}
            {...register("mobileNo", {
              required: "Phone No is required",
              minLength:{
                value: 10,
                message: "Phone No should in 10 digit",
              },
              maxLength:{
                value:10,
                message: "Phone No should in 10 digit",
              }
            })}
          />
          {errors.mobileNo && (
            <p className="text-red-500 text-end text-sm">
              {errors.mobileNo.message} *
            </p>
          )}





          <div className=" w-fullflex justify-center items-center gap-12 mt-2 ">
            <div className=" rounded-[16px]">
              <button
                className=" w-full bg-blue-500 p-2 text-white cursor-pointer rounded-[12px] hover:shadow-black flex items-center gap-2 justify-center"
                disabled={isSubmitting} 
                type="submit"
              >
                
                { isSubmitting ? <p className="flex items-center gap-2">Please Wait <img src={loadingGif} alt="" className="w-5"/></p> : <p className="flex gap-1">Sign Up <FaArrowRightLong className="m-1"/></p>}
                
              </button>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
              />
            </div>
          </div>
          <p className="text-center">
            Already Have An Account
             ? <Link to="/login">
              <span className="text-blue-500 hover:cursor-pointer">Log in</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
