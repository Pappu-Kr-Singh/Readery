import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      userName: data.userName,
      password: data.password,
    };

    // console.log(data);

    await axios
      .post("http://localhost:8000/user/login", userInfo)
      .then((res) => {
        // console.log(res.data);
        if (res.data) {
          alert("User Registered Successfully");
        }
        localStorage.setItem("Users", JSON.stringify(res.data.data));
      })
      .catch((err) => {
        if (err.response) {
          // console.log(err.response);

          alert("Error" + err.response.data.message);
        }
      });
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal dark:text-black ">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog ">
            {/* if there is a button in form, it will close the modal */}
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>

            <h3 className="font-bold text-xl text-center ">Login</h3>
            <div className="mt-4 mx-4 space-y-2">
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter Your Email.."
                className="outline-none border p-1 rounded-md w-full"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
            </div>
            {/* Password */}
            <div className="mt-4 mx-4 space-y-2">
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter Your Password.."
                className="outline-none border p-1 rounded-md w-full"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
            </div>

            <div className="align-center flex justify-around text-center">
              <button className="py-1 mt-4 px-2 border bg-pink-500 text-white rounded-md hover:bg-pink-800 duration-200">
                Login
              </button>
              <p className="py-1 mt-4 px-2">
                Don't Have an account?
                <Link to="/signup">
                  <span className="text-sm mx-1 font-bold text-blue-800 underline ">
                    Sign Up
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Login;
