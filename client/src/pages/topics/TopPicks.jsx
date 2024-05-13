import React from "react";
import { Link } from "react-router-dom"

const TopPicks = ({ product }) => {
  return (
    <>
      <div className="flex flex-col items-center p-4 space-y-2 border-solid border-1 bg-gray-50 " >
       <Link to={`/product/details/${product._id}`}>
       <img
          className="w-full h-32 border-dotted border-black cursor-pointer object-cover rounded-md mb-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 sm:mb-4"
          src={product?.productImg?.url}
          alt={product?.productName}
        />

        <h2 className="text-xl text-gray-500">{product?.productName}</h2>
        <p className="text-gray-500">Rs. {product?.price}</p>
       </Link>
      </div>
    </>
  )
};

export default TopPicks;
