import React from "react";
import list from "../../public/list.json";
import Cards from "../component/Cards";
import { Link } from "react-router-dom";

const Course = () => {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="pt-28 text-center items-center justify-center">
          <h1 className="text-2xl md:text-4xl">
            We are Delighted To have you
            <span className="text-pink-500">Here!:)</span>
          </h1>
          <p className="mt-12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
            obcaecati quas, adipisci laborum inventore maxime eum excepturi a.
            Quidem impedit iure reprehenderit sint eos quia nam animi repellat
            neque commodi?
          </p>
          <Link to={"/"}>
            <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-800 duration-200 mt-8">
              Back
            </button>
          </Link>
        </div>

        <div className="m-12 grid grid-cols-1 md:grid-cols-4">
          {list.map((item) => (
            <Cards item={item} key={item.id} />
          ))}
        </div>
      </div>
      ;
    </>
  );
};

export default Course;
