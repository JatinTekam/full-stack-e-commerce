
import Form from "../component/Form";
import Rive from "../component/Rive";
import { Link } from "react-router-dom";
const Signup = () => {
 

  return (
    <div className="w-full h-screen flex gap-2 items-center bg-black justify-center">
      <Rive/>
      <div className="w-180 justify-around border p-5 rounded-2xl bg-white  opacity-70">
        <h1 className="text-center text-3xl mb-5">
          <i>Sign Up</i>
        </h1>
        <Form/>
        <p className="text-center">
                Already Have An Account
                 ? <Link to="/login">
                  <span className="text-blue-500 hover:cursor-pointer">
                    Log in
                  </span>
                </Link>
              </p>
      </div>
    </div>
  );
};

export default Signup;
