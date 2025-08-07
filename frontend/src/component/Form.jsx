import React, { useEffect, useState } from "react";
import loadingGif from "../assets/images/loading.gif";
import { FaArrowRightLong } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { UserSignUp } from "../features/signup/SignupSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../utils/messages";
import { FaEyeSlash } from "react-icons/fa";

const Form = () => {
  const [isSubmitting, setIsSubmiting] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = (data, e) => {
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
      className="w-full pl-12"
      onSubmit={handleSubmit(onSubmit)}
      method="post"
    >
      <div className=" flex flex-col items-center gap-3 ">
        {/* <div className=" "> */}
          <div className=" w-80 flex flex-col">
            <input
              type="text"
              id="firstname"
              placeholder="First Name"
              className={`w-70 outline-none bg-[#05060f0a] p-2 ${
                errors.firstName ? " border rounded-md border-red-600" : "border rounded"
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
              <p className="text-red-500  text-sm">
                {errors.firstName.message} *
              </p>
            )}
          </div>

          <div className=" w-80 flex flex-col">
            <input
              type="text"
              id="lastname"
              placeholder="Last Name"
              className={`w-70 outline-none bg-[#05060f0a] p-2 ${
                errors.lastName ? " border rounded-md border-red-600" : "border rounded"
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
              <p className="text-red-500  text-sm">
                {errors.lastName.message} *
              </p>
            )}
          </div>
        {/* </div> */}

        <div className="w-80 flex flex-col">
          <input
            type="text"
            id="username"
            placeholder="Username"
            name="username"
            className={`w-70 outline-none bg-[#05060f0a] p-2 ${
              errors.username ? " border rounded-md border-red-600" : "border rounded"
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
            <p className="text-red-500  text-sm">
              {errors.username.message} *
            </p>
          )}
        </div>

        <div className="w-80 flex flex-col">
          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              className={`w-55 outline-none bg-[#05060f0a] p-2 ${
                errors.password ? " border-l rounded-tl-md rounded-bl-md border-t border-b border-red-600" : "border-l rounded-tl-md rounded-bl-md border-t border-b "
              } `}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message: "Password should be contain [A-Z,a-z,0-9]",
                },
              })}
            />
            <div
              className={ errors.password ? ` p-3 cursor-pointer bg-[#05060f0a] border-r border-t rounded-tr-md border-b rounded-br-md border-red-600` : `p-3 cursor-pointer bg-[#05060f0a] border-r border-t rounded-tr-md border-b rounded-br-md`}
              onClick={() => setShowPassword(!showPassword)}
            >
              <FaEyeSlash className="w-9 text-sm" />
            </div>
          </div>

          {errors.password && (
            <p className="text-red-500  text-sm">
              {errors.password.message} *
            </p>
          )}
        </div>

        <div className="w-80 flex flex-col">
          {/* <label htmlFor="email">Email</label> */}
          <input
            type="email"
            id="email"
            placeholder="Email"
            className={`w-70 outline-none bg-[#05060f0a] p-2  ${
              errors.email ? "border rounded-md border-red-600" : "border rounded-md"
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
            <p className="text-red-500 w-full text-sm">
              {errors.email.message} *
            </p>
          )}
        </div>


        <div className="w-80 flex flex-col">
        <input
          type="text"
          name="mobileNo"
          placeholder="Phone Number"
          id="mobile"
          className={`w-70 outline-none bg-[#05060f0a] p-2 ${
            errors.phoneNumber ? "border rounded-md border-red-600" : "border rounded-md"
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
          <p className="text-red-500  text-sm w-full">
            {errors.phoneNumber.message} *
          </p>
        )}
        </div>

        <div className="mt-5 w-full flex flex-col items-center">
          <div className=" w-80  flex  gap-12 mb-2 ">
            <div className="w-70 rounded-[16px]">
              <button
                className=" w-full bg-blue-500 p-2 text-white cursor-pointer rounded-[12px] hover:shadow-black flex gap-2 justify-center"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <p className="flex items-center gap-2">
                    Please Wait <img src={loadingGif} alt="" className="w-5" />
                  </p>
                ) : (
                  <p className="flex gap-1">
                    Sign Up <FaArrowRightLong className="m-1" />
                  </p>
                )}
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
