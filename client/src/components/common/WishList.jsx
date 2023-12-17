import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {useNavigate} from "react-router-dom"
import { useSelector } from "react-redux";

const WishList = ({ setOpen }) => {
  const router=useNavigate()
  const wishProducts = useSelector((state) => state?.auth?.user?.wishlist);

  const handleClick = (id) => {
    console.log(id);
    id ? router(`/product-details/${id}`) : null;
    return;
  };
  if (wishProducts.length==0) return null
  return (
    <div className="fixed top-0 right-0 mt-24 z-10 bg-white p-4 shadow-md rounded-md">
      <button className="absolute top-0 right-0" onClick={() => setOpen(false)}>
        <XMarkIcon className="w-6 h-6 text-black" />
      </button>
      <ul className="flex flex-col items-center py-4">
        {wishProducts.map(({ title, images, _id }) => (
          <li
            key={_id}
            className="flex justify-between mb-2 cursor-pointer"
            onClick={() => handleClick(_id)}
          >
            <img
              className="w-16 h-16 object-cover rounded-md mr-2"
              src={images[0]}
              alt="product"
            />
            <div className="text-sm  hover:bg-gray-300">{title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishList;
