import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

const LogOut = () => {
  const [authUser, setAuthUser] = useAuth();

  const handleLogout = () => {
    try {
      setAuthUser({
        ...authUser,
        createdUser: null,
      });
      toast.success("Logout Successfully");
      localStorage.removeItem("Users");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Error" + error.message);
      setTimeout(() => {}, 2000);
    }
  };

  return (
    <button
      className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogOut;
