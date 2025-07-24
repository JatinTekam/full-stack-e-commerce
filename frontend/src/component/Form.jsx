
import React, { useEffect, useState } from "react";
import loadingGif from "../assets/images/loading.gif";
import { FaArrowRightLong } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { UserSignUp } from "../features/signup/SignupSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../utils/messages";


const Form = () => {
  const [isSubmitting, setIsSubmiting] = useState(false);
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = (data,e) => {
   
    e.preventDefault();
    
    handleFormSubmit(data);
    
  };

  const handleFormSubmit = (data) => {
    dispatch(UserSignUp(data));
    setIsSubmiting(true);
  };

  useEffect(() => {
    let timer;
    if (error) {
       errorMsg(error.message);
       return;
    }
    if (user) {
    successMsg(user.message);
     timer = setTimeout(() => {
      navigate("/login");
    }, 2000);
    }
    return () => {
    if (timer) clearTimeout(timer);
  };
  }, [error, user, navigate, successMsg, errorMsg]);

  useEffect(() => {
    setTimeout(() => {
      if (isSubmitSuccessful) {
        reset();
        setIsSubmiting(false);

      }
    }, 2000);
  }, [isSubmitSuccessful, reset]);


  return (
    <form
          action=""
          className="w-full grid-cols-2 pl-12 "
          onSubmit={handleSubmit(onSubmit)}
          method="post"
        >
          <div className="flex flex-wrap gap-5">
            <div className="flex flex-col">
              <label htmlFor="firstname" className="pb-2">First Name</label>
              <input
                type="text"
                id="firstname"
                className={`w-70 outline-none ${
                  errors.firstName ? "border-b border-b-red-600" : "border-b"
                } `}
                {...register("firstName", {
                  required: "First Name Is required",
                  minLength: {
                    value: 5,
                    message: "Minimum 5 character required",
                  },
                })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-end text-sm">
                  {errors.firstName.message} *
                </p>
              )}
            </div>

             <div className="flex flex-col">
              <label htmlFor="lastname" className="pb-2">Last Name</label>
              <input
                type="text"
                id="lastname"
                className={`w-70 outline-none ${
                  errors.lastName ? "border-b border-b-red-600" : "border-b"
                } `}
                {...register("lastName", {
                  required: "Last Name Is required",
                  minLength: {
                    value: 5,
                    message: "Minimum 5 character required",
                  },
                })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-end text-sm">
                  {errors.lastName.message} *
                </p>
              )}
            </div>


            

           

            <div className="flex flex-col">
              <label htmlFor="username" className="pb-2">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className={`w-70 outline-none ${
                  errors.username ? "border-b border-b-red-600" : "border-b"
                } `}
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: 5,
                    message: "Username must be greater then 5 character",
                  },
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-end text-sm">
                  {errors.username.message} *
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="pb-2">Password</label>
              <input
                type="text"
                id="password"
                name="password"
                className={`w-70 outline-none ${
                  errors.password ? "border-b border-b-red-600" : "border-b"
                } `}
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                    message: "Password should be contain [A-Z,a-z,0-9]",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-end text-sm">
                  {errors.password.message} *
                </p>
              )}
            </div>

           
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
                <p className="text-red-500 w-full text-end text-sm">
                  {errors.email.message} *
                </p>
              )}
        

            <label htmlFor="mobile">Mobile no.</label>
            <input
              type="text"
              name="mobileNo"
              id="mobile"
              className={`w-full outline-none ${
                errors.phoneNumber ? "border-b border-b-red-600" : "border-b"
              } `}
              {...register("phoneNumber", {
                required: "Phone No is required",
                minLength: {
                  value: 10,
                  message: "Phone No should in 10 digit",
                },
                maxLength: {
                  value: 10,
                  message: "Phone No should in 10 digit",
                },
              })}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-end text-sm w-full">
                {errors.phoneNumber.message} *
              </p>
            )}

            <div className="mt-5 w-full flex flex-col items-center">
              <div className=" w-full flex justify-center items-center gap-12 mb-2 ">
                <div className="w-70 rounded-[16px]">
                  <button
                    className=" w-full bg-blue-500 p-2 text-white cursor-pointer rounded-[12px] hover:shadow-black flex items-center gap-2 justify-center"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? (
                      <p className="flex items-center gap-2" >
                        Please Wait{" "}
                        <img src={loadingGif} alt="" className="w-5" />
                      </p>
                    ) : (
                      <p className="flex gap-1">
                        Sign Up <FaArrowRightLong className="m-1" />
                      </p>
                    )}
                  </button>
                  <ToastContainer/>
                </div>
              </div>
              
            </div>
          </div>
        </form>
  )
}

export default Form