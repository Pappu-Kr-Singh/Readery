import React from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useAuth } from "../context/AuthProvider"; // Adjust the path accordingly
import ChangePassword from "./ChangePassword";

const Profile = () => {
  const [authUser, setAuthUser] = useAuth();
  // console.log(authUser.user.avatar);

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-14">
        <div className="w-full py-10 px-4 md:px-0 mt-8 md:mt-25 bg-red-100 rounded-2xl shadow-slate-100 border border-indigo-500">
          <div className="flex justify-center gap-8 mt-8 items-center">
            <div className="avatar">
              <div className="w-20 sm:w-44 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    authUser.user?.avatar ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  }
                  alt="User Avatar"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-6xl font-bold text-indigo-500">
                Welcome to your <br /> profile, {authUser?.userName || "User"}
              </h1>
            </div>
          </div>

          <div className="flex px-2 flex-col sm:flex-row justify-center gap-4 mt-8">
            <div className="">
              <a
                className="btn btn-outline btn-primary w-full sm:w-auto duration-300 cursor-pointer font-medium"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Change Current Password
              </a>
              <ChangePassword />
            </div>

            {/* <button className="btn btn-outline btn-secondary w-full sm:w-auto">
              Update Account Details
            </button>
            <button className="btn btn-outline btn-accent w-full sm:w-auto">
              Update Profile Image
            </button> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
