import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import loadingGif from "../assets/images/loading.gif";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/login/loginSlice";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { errorMsg, successMsg } from "../utils/messages";
import { useAuth } from "../authContext/AuthContext";
import { userInfo } from "../features/user/userSclice";
import Rive from "../component/Rive";
import { getUserOrders } from "../features/userOrders/userOrders";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [isSubmitting, setIsSubmiting] = useState(false);
  const[showPassword,setShowPassword]=useState(true);
  const { email, loading, error, message, accessToken , username, status, id} = useSelector(
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
      dispatch(userInfo({username,accessToken}));
      dispatch(getUserOrders({id,accessToken}));
      timer = setTimeout(() => {
        navigate("/");
      }, 2000);
    }
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
    <div className="w-full h-screen  flex  gap-15 items-center relative bg-black justify-center">
      <Rive/>

      <div className="w-[90vw] md:w-[45vw] xl:w-[40vw] sm:w-[55vw] flex flex-col items-center border  py-10 rounded-2xl bg-white opacity-70">
        <h1 className="text-center text-3xl mb-5">
          <i>Log in</i>
        </h1>
        <form
          action=""
          className="w-[90vw]  md:w-[45vw] sm:w-[55vw] xl:w-[40vw] flex flex-col gap-2 items-center "
          onSubmit={handleSubmit(onSubmit)}
          method="post"
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="text-xl">Email</label>
            <input
              type="email"
              id="email"
              className={`w-[53vw] md:w-[30vw] sm:w-[35vw] outline-none ${
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
          <label htmlFor="password" className="text-xl">Password</label>
          <div className="flex">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            autoComplete="new-password"
            className={`w-[50vw] md:w-[29vw] sm:w-[32vw] outline-none ${
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
            <span className="border-b cursor-pointer" onClick={()=>setShowPassword(!showPassword)}>
            <FaEyeSlash className="w-5"/>
            </span>
            </div>
          {errors.password && (
            <p className="text-red-500 text-end text-sm">
              {errors.password.message} *
            </p>
          )}

          </div>

          <div className=" w-full flex justify-center items-center gap-12 mt-2 ">
            <div className="w-full rounded-[16px] flex justify-center">
              <button
                className=" w-[50vw] md:w-[29vw] sm:w-[32vw]  bg-blue-500 p-2 text-white cursor-pointer rounded-[12px] hover:shadow-black flex items-center gap-2 justify-center"
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
