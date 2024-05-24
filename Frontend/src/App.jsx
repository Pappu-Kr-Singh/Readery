import React from "react";
import Home from "./home/Home";
import { Route, Routes } from "react-router-dom";
import Courses from "./Courses/Courses";
import SignUp from "./component/SignUp";
// import ContactUs from "./component/ContactUs";

const App = () => {
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={<Courses />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/contact-us" element={<ContactUs />} /> */}
        </Routes>
      </div>
    </>
  );
};

export default App;
