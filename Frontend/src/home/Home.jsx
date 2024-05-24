import React from "react";
import Navbar from "../component/Navbar";
import Banner from "../component/Banner";
import Footer from "../component/Footer";
import FreeBook from "../component/FreeBook";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <FreeBook />
      <Footer />
    </div>
  );
};

export default Home;
