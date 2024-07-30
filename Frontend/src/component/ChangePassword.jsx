import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider"; // Adjust the path accordingly

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };

    // console.log(userInfo);
    // console.log(data);

    await axios
      .post("http://localhost:8000/user/change-password", userInfo)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          // console.log(err.response);
          toast.error("Error " + err);
          // setTimeout(() => {}, 2000);
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
              to="/user/profile"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </Link>

            <h3 className="font-bold text-xl text-center ">Login</h3>
            <div className="mt-4 mx-4 space-y-2">
              <span>Old Password</span>
              <br />
              <input
                type="password"
                placeholder="Old Password.. "
                className="outline-none border p-1 rounded-md w-full"
                {...register("oldPassword", { required: true })}
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
            </div>
            {/* New Password */}

            <div className="mt-4 mx-4 space-y-2">
              <span>New Password </span>
              <br />
              <input
                type="password"
                placeholder="New Password.."
                className="outline-none border p-1 rounded-md w-full"
                {...register("newPassword", { required: true })}
              />
              {errors.password && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
            </div>

            {/* confirmPassword */}
            <div className="mt-4 mx-4 space-y-2">
              <span>Confirm Password </span>
              <br />
              <input
                type="password"
                placeholder="Confirm Password.."
                className="outline-none border p-1 rounded-md w-full"
                {...register("confirmPassword", { required: true })}
              />
              {errors.password && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
            </div>

            <div className="align-center flex justify-around text-center">
              <button className="py-1 mt-4 px-2 border bg-pink-500 text-white rounded-md hover:bg-pink-800 duration-200">
                Change Current Password
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ChangePassword;
