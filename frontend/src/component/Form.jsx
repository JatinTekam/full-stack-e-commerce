
import React, { useEffect, useState } from "react";
import loadingGif from "../assets/images/loading.gif";
import { FaArrowRightLong } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { successfulNotification, errorNotification } from "../allMessages/messages";
import { UserSignUp } from "../features/signup/SignupSlice";
import { useDispatch, useSelector } from "react-redux";


const Form = () => {
  const [isSubmitting, setIsSubmiting] = useState(false);
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = (data) => {
    handleFormSubmit(data);
  };

  const handleFormSubmit = (data) => {
    dispatch(UserSignUp(data));
    setIsSubmiting(true);
  };

  useEffect(() => {
    if (error) {
      return errorNotification(error.message);
    }
    if (user) {
      return successfulNotification(user.message);
    }
  }, [error, user]);

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
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className={`w-70 outline-none ${
                  errors.name ? "border-b border-b-red-600" : "border-b"
                } `}
                {...register("name", {
                  required: "Name Is required",
                  minLength: {
                    value: 5,
                    message: "Minimum 5 character required",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-end text-sm">
                  {errors.name.message} *
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className={`w-70 outline-none ${
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
            </div>

            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className={`w-70 outline-none ${
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
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
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
            {errors.mobileNo && (
              <p className="text-red-500 text-end text-sm w-full">
                {errors.mobileNo.message} *
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
              
            </div>
          </div>
        </form>
  )
}

export default Form