import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import img1 from "../assets/images/img3.jpg";
import SignupImg from "../component/SignupImg";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/login/login";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const dispatch=useDispatch();

  const onSubmit = (data) => {
    //console.log(data);
    loginUser(data)
  };



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

          <div class=" w-full flex justify-center items-center gap-12 mt-2 ">
            <div class="w-full rounded-[16px]">
              <button className=" w-full bg-blue-500 p-2 text-white cursor-pointer rounded-[12px] hover:shadow-black flex items-center gap-2 justify-center">
                Log in <FaArrowRightLong className="mt-1" />
              </button>
            </div>
          </div>
          <p className="text-center">
            Don't Have An Account ?
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
