import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./Courses/Courses";
import SignUp from "./component/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
// import ContactUs from "./component/ContactUs";

const App = () => {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);

  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/contact-us" element={<ContactUs />} /> */}
        </Routes>
        <Toaster />
      </div>
    </>
  );
};

export default App;
