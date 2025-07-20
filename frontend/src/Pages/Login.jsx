import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import loadingGif from "../assets/images/loading.gif";
import SignupImg from "../component/SignupImg";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/login/loginSlice";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { errorMsg, successMsg } from "../utils/messages";
import { useAuth } from "../authContext/AuthContext";

import { jwtDecode } from "jwt-decode";
import { userInfo } from "../features/user/userSclice";

const Login = () => {
  const [isSubmitting, setIsSubmiting] = useState(false);
  const { email, loading, error, message, accessToken , username, status} = useSelector(
    (state) => state.login
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    handleLogIn(data);
  };

  const handleLogIn = (data) => {
    dispatch(loginUser(data));
    setIsSubmiting(true);
  };

  useEffect(() => {
    let timer;
    if (error) {
      errorMsg(error.message);
      return;
    }
    if (status===200) {
      successMsg(message);
      timer = setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    dispatch(userInfo({username,accessToken}));
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [error, email, navigate, successMsg, errorMsg, accessToken]);

  useEffect(() => {
    setTimeout(() => {
      if (isSubmitSuccessful) {
        reset();
        setIsSubmiting(false);
      }
    }, 2000);
  }, [isSubmitSuccessful, reset]);


  return (
    <div className="w-full h-screen  flex  gap-15 items-center relative bg-black">
      <SignupImg />

      <div className="w-160 flex flex-col items-center border  py-10 rounded-2xl bg-white opacity-70">
        <h1 className="text-center text-3xl mb-5">
          <i>Log in</i>
        </h1>
        <form
          action=""
          className="w-80 flex flex-col gap-2 "
          onSubmit={handleSubmit(onSubmit)}
          method="post"
        >
          <div className="flex flex-col">
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
          </div>

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

          <div className=" w-full flex justify-center items-center gap-12 mt-2 ">
            <div className="w-full rounded-[16px]">
              <button
                className=" w-full bg-blue-500 p-2 text-white cursor-pointer rounded-[12px] hover:shadow-black flex items-center gap-2 justify-center"
                disabled={isSubmitting}
                type="submit"
              >
                {loading ? (
                  <p className="flex items-center gap-2">
                    Please Wait <img src={loadingGif} alt="" className="w-5" />
                  </p>
                ) : (
                  <p className="flex gap-1">
                    Log in <FaArrowRightLong className="m-1" />
                  </p>
                )}
              </button>
            </div>
          </div>
          <p className="text-center">
            Don't Have An Account ?{" "}
            <Link to="/signup">
              <span className="text-blue-500 hover:cursor-pointer">
                Sign up
              </span>
            </Link>
          </p>
        </form>
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
  );
};

export default Login;
