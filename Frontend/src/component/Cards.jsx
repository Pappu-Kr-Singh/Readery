import React from "react";

const Cards = ({ item }) => {
  return (
    <>
      <div className="mt-4 my-3 p-3 hover:scale-105 duration-300 ">
        <div className="card w-92 bg-base-100 shadow-xl dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img src={item.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary py-3">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between">
              <div className="badge badge-outline">${item.price}</div>
              <div className="px-2 py-1 border-[2px] cursor-pointer rounded-full hover:bg-pink-500 duration-200 hover:text-white ">
                Buy Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
