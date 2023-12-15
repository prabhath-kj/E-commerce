import { Link } from "react-router-dom";
import { useState } from "react";
import WishList from "./WishList";
import {
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/solid"; // Import wishlist, cart, and user icons
import React from "react";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  const titles = [
    {
      title: "Wishlist",
      icon: HeartIcon,
      count: 3, // Example count for wishlist
    },
    {
      title: "User",
      icon: UserIcon,
    },
    // {
    //   title: "Sign In",
    //   path: "#login",
    // },
    {
      title: "Cart",
      icon: ShoppingCartIcon,
      count: 5, // Example count for cart
    },
    ,
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-sky-950 opacity-100 shadow-md z-40">
        <div className="flex flex-wrap items-center justify-between px-10 py-5">
          <Link
            to={"/"}
            className="font-semibold sm:text-4xl text-lg text-white"
          >
            E COMMERCE
          </Link>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search any things..."
              className="border rounded-l px-2 py-2 focus:outline-none"
            />
            <button className="border bg-orange-400 text-white rounded-r px-2 py-2">
              Search
            </button>
          </div>
          <div className="menu hidden md:block lg:block md:w-auto" id="navBar">
            <ul className="flex md:flex-row md:space-x-4">
              {titles.map(({ title, icon: Icon, count }, index) => (
                <li
                  key={index}
                  className="block py-2 pl-3 pr-4 text-black font-semibold cursor-pointer relative"
                  onClick={() => {
                    if (title === "Wishlist") {
                      setOpen(true);
                    }
                    return;
                  }}
                >
                  <div className="wish-list block cursor-pointer m-2">
                    {Icon && <Icon className="w-6 h-6 text-white " />}
                    {count && (
                      <span className="bg-orange-400 text-white rounded-full px-2 py-1 absolute -top-2 -right-0">
                        {count}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <div className="relative">
        {isOpen && <WishList pages={titles} setOpen={setOpen} />}
      </div>
    </>
  );
};

export default Navbar;