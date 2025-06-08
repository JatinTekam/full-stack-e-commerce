import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import img1 from "../assets/images/img3.jpg";
import SignupImg from "../component/SignupImg";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/login/login";

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
                {" "}
                Sign up
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
