import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import WishListHeartIcon from "./WishListHeartIcon";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const WishList = ({ setOpen }) => {
  const router = useNavigate();
  const wishProducts = useSelector((state) => state?.auth?.user?.wishlist);

  const handleClick = (id) => {
    console.log(id);
    id ? router(`/product-details/${id}`) : null;
    return;
  };
  if (wishProducts.length == 0) return null;
  return (
    <div className="fixed top-0 right-0 mt-24 z-10 bg-white p-4 shadow-md rounded-md">
      <button className="absolute top-0 right-0" onClick={() => setOpen(false)}>
        <XMarkIcon className="w-6 h-6 text-black" />
      </button>
      <ul className="flex flex-col items-center py-4">
        {wishProducts.map(({ title, images, _id }) => (
          <li key={_id} className="flex justify-between mb-2 cursor-pointer">
            <img
              className="w-16 h-16 object-cover rounded-md mr-1"
              src={images[0]}
              alt="product"
              onClick={() => handleClick(_id)}
            />
            <div
              className="text-sm  hover:bg-gray-300 px-2 py-2 text-center"
              onClick={() => handleClick(_id)}
            >
              {title}
            </div>
            <div className="px-2 py-2">
              <WishListHeartIcon id={_id} key={_id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishList;
